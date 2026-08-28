# Ревʼю проєкту next-supabase

Дата: 2026-08-28
Стек: Next.js 16.1.4 (App Router, React 19.2, react-compiler), Supabase (`@supabase/ssr`), Mantine, Tailwind v4, Zod, TypeScript (strict).

Загальне враження: акуратний адмін-CRM (компанії/промоакції/статистика) з правильним використанням App Router (Server Components, Server Actions, паралельний слот `@title`), нормальною структурою `services/actions/components`. Основні проблеми — не в архітектурі, а в кількох місцях авторизації, дублюванні форм та стані репозиторію (незакомічена міграція на Yarn Berry).

## 1. Безпека / авторизація — найважливіше

### 1.1 Мутації без перевірки користувача та без перевірки власності (IDOR) — ВИПРАВЛЕНО
`createCompany` (`src/services/admin/companiesApi.ts:71-114`) була єдиною функцією, яка викликала `supabase.auth.getUser()` і проставляла `user_id`. Усі інші мутації цього не робили:

- `updateCompany`, `deleteCompany` (`src/services/admin/companiesApi.ts`)
- `createPromotion`, `updatePromotion`, `deletePromotion` (`src/services/admin/promotionsApi.ts`)

Ці функції одразу виконували `update`/`delete` за `id` з URL/аргументу, без перевірки, що ресурс належить поточному користувачу (і без перевірки, що користувач взагалі автентифікований — вони покладались лише на middleware). Якщо RLS-політики в Supabase не закривають цей кейс на рівні БД, будь-який залогінений користувач міг редагувати/видаляти чужі компанії та промоакції, підставивши чужий `id` (класичний IDOR).

**Що зроблено:**
- В `updateCompany`/`deleteCompany` додано `auth.getUser()` (редірект на логін, якщо не залогінений) і фільтр `.eq('user_id', user.id)` прямо в `update`/`delete`-запиті; якщо після мутації не повернулось жодного рядка — кидається помилка "не знайдено або немає прав".
- В `createPromotion`/`updatePromotion`/`deletePromotion` додано `auth.getUser()` та перевірку власності через компанію (в таблиці `promotions` немає власного `user_id`, тому власність перевіряється по `companies.user_id` — новий хелпер `assertCompanyOwner`/`assertPromotionOwner` в `promotionsApi.ts`).

Це не скасовує потребу окремо перевірити RLS-політики в Supabase — код тепер не покладається на них як на єдиний захист, але сама конфігурація БД лишається неперевіреною з цієї сесії.

### 1.2 Немає розмежування ролей для `/admin`
`updateSession` (`src/lib/supabase/updateSession.ts`) редіректить лише на основі наявності сесії (`user`), без перевірки ролі/прав. Будь-який зареєстрований користувач автоматично отримує доступ до всього `/admin` (включно з чужими компаніями/промоакціями, статистикою). Якщо застосунок задумано як multi-tenant CRM (а не single-admin), варто додати перевірку ролі або фільтрацію даних по `user_id` у `getCompanies`/`getPromotions` тощо — зараз ці списки повертають **всі** записи всіх користувачів без фільтра власника.

## 2. Дублювання коду

### 2.1 Create/Update форми — майже 1:1 копії — ВИПРАВЛЕНО
- `CreateCompanyForm.tsx` (121 рядок) і `UpdateCompanyForm.tsx` (136 рядків) — мали ідентичну розмітку, відрізнялись лише `action`, наявністю `defaultValue` і полем логотипу.
- `CreatePromotionForm.tsx` (110) і `UpdatePromotionForm.tsx` (105) — та сама історія. При цьому `diff` показав і саму розбіжність, про яку йшлося вище: DatePicker `end_at` мав `required` у Create-формі, але не мав його в Update-формі — типовий наслідок копіпасти, коли зміну внесли лише в один з двох файлів.

**Що зроблено:** обидві пари форм об'єднано в `src/components/app/CompanyForm.tsx` і `src/components/app/PromotionForm.tsx` з пропом `mode: 'create' | 'update'` (дискримінована унія: `create` вимагає лише `companyId`/нічого, `update` — `id` і `initialValues`). Стара четвірка компонентів (`Create/UpdateCompanyForm`, `Create/UpdatePromotionForm`) видалена, усі 4 сторінки (`company-new`, `company-update`, `promotion-new`, `promotion-update`) переведені на нові компоненти. Розбіжність з `end_at required` усунено — тепер поле обов'язкове в обох режимах. Перевірено `tsc --noEmit`, `eslint` і `next build` — усе проходить без помилок.

## 3. Типи та надійність

- ~~Скрізь у `services/admin/*Api.ts` мапи будуються як `Partial<Record<CompanyFieldKey, any>>` — `any` зводить нанівець строгий TypeScript (`strict: true` в `tsconfig.json`). Легко занести неправильний тип у `insert`/`update`, і компілятор цього не впіймає.~~
- ~~`source.find(i => i.value === value)!.label` (`companiesApi.ts:95`, `:130`) — non-null assertion. Якщо прийде значення `country`/`category`, якого немає в `mock/data.ts` (наприклад, застаріле значення в БД або підмінений form-data key), функція впаде з рантайм-помилкою на `undefined.label` замість керованої відповіді про помилку.~~ — **ВИПРАВЛЕНО.**

  Мапінг form-data винесено в `buildCompanyFromFormData`/`buildPromotionFromFormData` (по одній helper-функції на файл, усуває й дублювання цього циклу між create/update). `any` прибрано — тип мапи тепер `Partial<Record<CompanyFieldKey, string | number | { label, value }>>` / `Partial<Record<PromotionFieldKey, string | number>>`. Non-null assertion замінено на явну перевірку: якщо `country`/`category` не знайдено у довіднику — кидається `Error('Invalid ... value: "...".')` замість падіння на `undefined.label`.

  Побічно виявлено і виправлено реальний недолік, який маскував `any`: числові поля (`income`, `sold`, `discount`) приходять з `FormData` як рядки і раніше йшли в Supabase `insert`/`update` без перетворення в `number`, попри те що в БД це числові колонки. Компілятор одразу підтвердив це помилкою типів після прибирання `any` (`discount: string` не сумісний з `discount: number`) — тепер ці поля явно парсяться через `Number(...)` з перевіркою на `NaN` і поверненням зрозумілої помилки.
- ~~Наскрізна орфографічна помилка **"Shema" замість "Schema"**: `src/shemas.ts`, `CompanyInsertShema`, `PromotionInsertShema`, `CompanyShema`, `PromotionShema`. Файл і типи використовуються по всьому проєкту — перейменування зараз дешевше, ніж пізніше. Аналогічно `src/utils/formateDate.ts` (мало б бути `formatDate`).~~ — **ВИПРАВЛЕНО.** `src/shemas.ts` → `src/schemas.ts`, `src/utils/formateDate.ts` → `src/utils/formatDate.ts` (через `git mv`, з історією). Усі типи перейменовано: `CompanyInsertShema`→`CompanyInsertSchema`, `CompanyShema`→`CompanySchema`, `PromotionInsertShema`→`PromotionInsertSchema`, `PromotionShema`→`PromotionSchema`, `ProfileShema`→`ProfileSchema`; усі імпорти та виклики `formateDate(...)` → `formatDate(...)` оновлено у 4 файлах, де використовувались (`PromotionDetailsCard.tsx`, `PromotionCard.tsx`, `CompanyDetailsCard.tsx`, `CompaniesTable/Row.tsx`). `tsc --noEmit`, `eslint` і `yarn build` пройшли чисто.

## 4. "Мокові" дані використовуються як продакшн-константи

~~`src/mock/*` імпортується не лише в моках, а прямо в продакшн-логіку: `categories`, `countries`, `statuses`, `generalStatisticsLabel` з `src/mock/data.ts` — використовуються в `services/admin/companiesApi.ts`, `dashboardApi.ts` та формах. Це фактично довідники/константи застосунку, а не тестові дані — назва теки `mock` вводить в оману і сигналізує "тимчасове", хоча це production dependency.~~ — **ВИПРАВЛЕНО.**

  Усі чотири винесено з `src/mock/data.ts` у `src/datasets/constants.ts` (поруч з `CONSTANTS`); файл `src/mock/data.ts` видалено як порожній/непотрібний. Імпорти оновлено на `@/datasets/constants` у `CompanyForm.tsx`, `services/admin/companiesApi.ts` і `services/admin/dashboardApi.ts`. У `src/mock/` лишились тільки `randomImage.ts` та `companies.json`/`promotions.json` (останні два, схоже, взагалі ніде не імпортуються — кандидат на видалення окремим кроком).
- `randomImage()` з `src/mock/randomImage.ts` викликається в `CreateCompanyForm` і `CreatePromotionForm`, щоб автоматично підставити **випадкове фото зі стоку** (picsum.photos/i.pravatar.cc) як логотип компанії/обкладинку промо — реального завантаження зображення користувачем немає, хоча в UI поле підписане як "Logo *" з зірочкою обовʼязковості, ніби це керований юзером ввід.

**Рекомендація:** або реалізувати реальний аплоад (Supabase Storage), або явно позначити це як плейсхолдер-функціонал і винести з теки `mock` у `constants`/`lib`.

## 5. Стан репозиторію / інструментарій

- Незакомічена міграція на **Yarn Berry**: `.yarnrc.yml` — untracked, `yarn.lock` змінено майже повністю (5762 вставки / 4109 видалень — це переформатування лока, типове для переходу classic→berry). В `.yarnrc.yml` виставлено:
  - `enableScripts: true` — дозволяє install-скрипти пакетів (потенційний вектор supply-chain атаки, варто усвідомлено тримати whitelist, якщо це не дефолт для причини);
  - `npmMinimalAgeGate: 0` — вимикає захист "не встановлювати щойно опубліковані пакети" (Yarn's package-age gate), що трохи підвищує ризик отримати щойно скомпрометований пакет одразу після публікації.
  Немає `packageManager` у `package.json` і немає `.yarn/releases/*`, тому версія Yarn береться з системи — на різних машинах/CI збірка може використовувати різний Yarn.
- Немає жодних тестів (`*.test.*`/`*.spec.*` відсутні) і немає CI (`.github/workflows` відсутній). Для CRM з мутаціями даних (create/update/delete) відсутність хоча б smoke/e2e тестів на серверні екшени — ризик регресій.
- ~~`README.md` — незмінний шаблон від `create-next-app`, не описує сам проєкт (як піднімати Supabase, які env-змінні потрібні, структуру `@title`-слоту).~~ — **ВИПРАВЛЕНО.** README переписано під проєкт (стек, змінні середовища, потрібна схема БД/RPC в Supabase, скрипти, структура `src/`, нотатка про auth/ownership-перевірки). Додано `.env.example` з трьома потрібними змінними (раніше на нього не було чим "cp" — файл не існував, хоч `.gitignore` вже мав виняток `!.env.example`). У `package.json` додано скрипти `typecheck` (`tsc --noEmit`), `stylelint` і `stylelint:fix` (раніше stylelint запускався лише вручну без npm-скрипта) — README оновлено відповідно.
- ESLint 8.57.1 (EOL, більше не підтримується апстрімом) поруч із Next 16 / React 19 — варто звірити, чи `next lint` ще підтримується в Next 16 (в останніх версіях Next команда `lint` виводиться з CLI на користь прямого ESLint/Biome), інакше `yarn lint` може просто перестати працювати.

## 6. Дрібніші спостереження

- `getCompanies`/`getPromotions`/`getPromotionsByCompany` формують `ilike` через `%${query}%` без екранування `%`/`_` у самому `query` — не SQL-injection (PostgREST параметризує значення), але користувач, що вводить `%` чи `_`, отримає непередбачувану поведінку пошуку (мінорний UX-баг).
- Паралельний слот `@title` (`src/app/@title/...`) дублює дерево маршрутів `src/app/...` лише заради тайтла сторінки (в основному — одна фраза на файл, як `admin/companies/company-new/page.tsx` → `<>Add new company</>`). Це осмислений патерн Next.js, але це подвійна структура тек, яку легко забути оновити при додаванні нового маршруту (немає жодного лінта/тесту, що звіряє відповідність `@title` і `app`).
- `forgotPassword` (`src/services/auth/api.ts:122-149`) звертається до `window.location.origin` у файлі без директиви `'use client'` на рівні файлу — працює, бо файл завжди імпортується з клієнтських форм, але це неявна залежність; варто передавати origin explicit або додати runtime-guard.

## Підсумок пріоритетів

| Пріоритет | Що зробити |
|---|---|
| ~~Високий~~ | ~~Додати перевірку користувача/власника в `updateCompany`, `deleteCompany`, `createPromotion`, `updatePromotion`, `deletePromotion`~~ — виправлено; лишається перевірити RLS-політики в Supabase |
| Високий | Вирішити, чи `/admin` — single-tenant чи multi-tenant, і відповідно відфільтрувати списки за `user_id` або додати ролі |
| ~~Середній~~ | ~~Об'єднати Create/Update форми компаній і промоакцій в один компонент~~ — виправлено |
| Середній | Закомітити або відкатити зміни `.yarnrc.yml`/`yarn.lock`, свідомо вирішити щодо `enableScripts`/`npmMinimalAgeGate`, зафіксувати `packageManager` |
| ~~Низький~~ | ~~Прибрати `any` в мапінгу form-data, замінити non-null assertion на явну обробку помилки~~ — виправлено (заразом виявлено і полагоджено, що `income`/`sold`/`discount` йшли в БД рядками замість чисел) |
| ~~Низький~~ | ~~Перейменувати `shemas.ts`→`schemas.ts`, `formateDate.ts`→`formatDate.ts`~~ — виправлено (разом з типами `*Shema`→`*Schema`) |
| ~~Низький~~ | ~~Винести `mock/data.ts` довідники (categories/countries/statuses/generalStatisticsLabel) з теки `mock` у `constants`~~ — виправлено, `mock/data.ts` видалено; окремо лишається вирішити долю `randomImage` (реальний аплоад чи явний плейсхолдер) і перевірити, чи потрібні `mock/companies.json`/`promotions.json` |
| ~~Низький~~ | ~~Оновити README під конкретний проєкт~~ — виправлено, разом з `.env.example`; додати базові тести/CI лишається |
