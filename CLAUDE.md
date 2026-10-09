# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

TrueScape — an admin CRM (companies, promotions, users, statistics dashboard) on Next.js 16 App Router + Supabase. See `README.md` for setup, the required Supabase schema/RLS, and the role matrix.

## Commands

Yarn 4 (Berry) only, not npm or pnpm.

- `yarn dev`: dev server (Turbopack), http://localhost:3000
- `yarn build`: production build
- `yarn lint`: ESLint (`@tarik02/eslint-config-type-1*`, which also enforces formatting)
- `yarn typecheck`: `tsc --noEmit`
- `yarn stylelint` / `yarn stylelint:fix`: lint `src/**/*.css`
- `yarn supabase gen types typescript --project-id <id> > src/db-types.ts`: regenerate DB types after a schema change

There is no test suite. Verify changes with `yarn lint && yarn typecheck && yarn stylelint`.

Env vars (`.env`, template in `.env.example`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY`, `NEXT_PUBLIC_GOOGLE_MAPS_KEY`. Code reads them through `CONSTANTS` in `src/datasets/constants.ts`.

## Architecture

### Data flow: page → service, form → action → service

- **`src/services/admin/*Api.ts`** is the only place that talks to Supabase for admin data. It always uses the server client (`createSupabaseServer` from `src/lib/supabase/server.ts`). Reads are often wrapped in React `cache()` to dedupe calls within one request. Errors are thrown as `Error`s with a readable message.
- **Server Components** (pages, and async components such as `CompanyForm`) call service read functions directly.
- **`src/actions/*.ts`** are thin `'use server'` wrappers that forward to the service mutation functions. Forms pass them to `next/form` `<Form action={…}>`; update forms bind the id with `action.bind(null, id)`.
- **Mutations** follow a fixed sequence: `supabase.auth.getUser()` → `redirect` to login if there is no user → `assertAdmin` / `assertSuperAdmin` → build the payload from `FormData` → query with `.select('id')`, throwing "not found" when 0 rows come back (RLS filters rows silently) → `redirect(...)` or `revalidatePath('/admin')`.
- **Client-side calls** (e.g. the delete buttons) call the action inside `useTransition`, wrap it in try/catch, and report the result through `sonner` `toast`.
- **Auth** (`src/services/auth/api.ts`) is the exception: it runs in the browser with `createSupabaseClient` (`src/lib/supabase/client.ts`), validates input with Zod schemas from `validationSchemas.ts`, and returns `{ success, error }` instead of throwing.

### Auth and permissions

- `src/proxy.ts` is the Next 16 middleware, and its entry point is `proxy`, not `middleware`. It calls `updateSession`, which refreshes the session cookie and redirects unauthenticated users on any non-`/auth` path to login, and authenticated users on `/auth/*` to the dashboard.
- Role checks live in `src/services/admin/permissions.ts`. Mutations call `assertAdmin` / `assertSuperAdmin`. Pages and UI use `isCurrentUserAdmin` / `isCurrentUserSuperAdmin` to hide actions (a `canManage` prop) or `notFound()` the page. Roles are `ProfileRoleType` in `src/enums.ts`. Enforce new permission rules in both the service layer and Supabase RLS.

### Types

- `src/db-types.ts` is generated, so never hand-edit it.
- `src/schemas.ts` deep-merges hand-written Row/Insert types over the generated ones (`type-fest` `MergeDeep`) into the `Database` type that every Supabase client is parameterized with. Do this because `category` and `country` are stored as JSON `{ label, value }` objects, and `status`/`role` are app enums.
- `src/types.ts` defines `*Mapper` types (`Omit`/`Pick` of the schemas). They match the column list of each `.select(...)`, and services cast query results to them.
- Category and country option lists come from the `categories` and `countries` tables (`referenceApi.ts`), not from constants.

### Routing

- `src/app/@title/` is a parallel-route slot that renders only the header title (consumed in `src/app/layout.tsx`). **Every new `admin/` or `auth/` page needs a matching `@title/` page.**
- Use the URL builders in `src/routes.ts` (`pagesCompanyUrl(id)` and the rest) instead of hardcoded paths.
- `MantineProvider` wraps only `src/app/admin/layout.tsx`. Mantine supplies Select and DateInput.

### Styling

- Tailwind v4 plus BEM-style component CSS. Classes use prefixes: `c-` for components, `f-` for form parts, `u-` for utilities (`@utility` in `src/styles/utilities/base.css`).
- Each component stylesheet in `src/styles/{components,parts,layouts}` must be `@import`ed into `src/styles/app.css` with the correct `layer(...)`.
- Theme tokens are in `src/styles/tailwind/theme.css`. PostCSS runs `postcss-import` → `@tailwindcss/nesting` → `@tailwindcss/postcss`, so component CSS uses nesting, `@variant`, and `@apply`.
- Variants use `class-variance-authority` (see `components/ui/buttons/Button.tsx`), and conditional classes use `clsx([...])`. The project has no `cn` helper, so use `clsx` wherever a `cn([...])` would otherwise go.
- `components/ui` holds presentational components. `components/app` holds feature components that may fetch data or call actions.

## Conventions

- Code style: 4-space indent; spaces inside brackets, braces, and template interpolations (`[ a, b ]`, `{ x }`, `${ id }`); a multiline JSX prop value goes on its own lines inside `{ }`. ESLint enforces import order: external, then `@/` internal, then relative, then `import type`, with blank lines between groups.
- React Compiler is on (`reactCompiler: true`), so don't add `useMemo`/`useCallback` by hand.
- Remote images need their host added to `images.remotePatterns` in `next.config.ts`.
