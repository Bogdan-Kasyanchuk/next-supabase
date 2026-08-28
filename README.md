# TrueScape

Admin CRM for managing companies and their promotions, with a statistics dashboard (general KPIs, sales, categories, countries map, active promotions). Built with Next.js (App Router) and Supabase.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Server Actions, React Compiler, Turbopack)
- React 19
- [Supabase](https://supabase.com) (Postgres + Auth) via `@supabase/ssr`
- [Mantine](https://mantine.dev) (Select, DateInput) + Tailwind CSS v4
- [Zod](https://zod.dev) for auth form validation
- TypeScript (`strict`)
- Yarn Berry — this repo is pinned to Yarn 4 via `.yarnrc.yml`; use `yarn`, not `npm`/`pnpm`, for every command below

## Prerequisites

- Node.js 20+
- Yarn 4 (run `corepack enable` if `yarn -v` doesn't already report `4.x`)
- A Supabase project (URL + anon/publishable key)
- A Google Maps API key (used by the countries statistics map on the dashboard)

## Getting started

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Copy the environment template and fill in your credentials:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (Project Settings → API) |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY` | Supabase anon/publishable API key (Project Settings → API) |
   | `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Google Maps JavaScript API key |

3. Set up the database schema. The app expects the following in your Supabase project's `public` schema (see the generated `src/db-types.ts`):
   - Tables: `companies`, `promotions`, `profiles` (including a `role text default 'viewer' check (role in ('superadmin', 'admin', 'viewer'))` column), `categories`, `countries`
   - Views: `companies_by_category`, `companies_by_country`, `general_statistics`
   - RPC: `user_email_exists(check_email text) returns boolean` — called during sign-up to reject duplicate emails before `auth.signUp`
   - Row Level Security policies:
     - `companies`/`promotions`: `select` open to any `authenticated` user; `insert`/`update`/`delete` restricted to `profiles.role in ('admin', 'superadmin')`.
     - `profiles`: a `select` policy so a user can read roles (own, or everyone's — the app only ever needs to read `role` by id); an `update` policy restricted to `profiles.role = 'superadmin'` (needed for `/admin/users` to actually persist a role change — a missing `update` policy here fails silently with "User not found" rather than a permission error, since RLS just filters the row out).
     - The app also enforces all of this itself in `src/services/admin/*Api.ts`/`permissions.ts`, but RLS should be the actual source of truth.
   - At least one `profiles` row needs `role = 'superadmin'` to begin with — set it manually the first time (`update public.profiles set role = 'superadmin' where email = '...'`); after that, a superadmin promotes others from `/admin/users`.

   After changing the schema, regenerate the types:

   ```bash
   yarn supabase gen types typescript --project-id <your-project-id> > src/db-types.ts
   ```

4. Start the dev server:

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Available scripts

- `yarn dev` — start the dev server (Turbopack)
- `yarn build` — production build
- `yarn start` — run the production build
- `yarn lint` — ESLint
- `yarn typecheck` — TypeScript, no emit
- `yarn stylelint` — lint styles
- `yarn stylelint:fix` — lint styles and auto-fix what's fixable

## Project structure

- `src/app` — App Router routes.
  - `admin/` — CRM screens (companies, promotions, dashboard), gated behind auth middleware.
  - `auth/` — login, sign-up, forgot/update password.
  - `@title/` — a parallel route slot mirroring `admin/`/`auth/` purely to render the page title in the header (see `src/app/layout.tsx`). When adding a new `admin`/`auth` route, add a matching page under `@title/` too.
- `src/components/app` — feature components (forms, tables, statistics widgets, layout parts).
- `src/components/ui` — presentational/design-system components (inputs, cards, buttons, layouts).
- `src/services/admin`, `src/services/auth` — data-access layer; all Supabase queries and mutations live here.
- `src/actions` — `'use server'` entry points that forward to `src/services/*`.
- `src/lib/supabase` — Supabase client factories for the browser, server components, and middleware.
- `src/proxy.ts` — Next.js middleware that refreshes the Supabase session and redirects unauthenticated users away from `/admin`.
- `src/schemas.ts` — hand-written row/insert types layered on top of the generated `src/db-types.ts`.
- `src/datasets/constants.ts` — app-wide constants (env-derived config, company status options, statistics labels). `categories`/`countries` option lists are **not** here — they're fetched live from the `categories`/`countries` Supabase tables via `src/services/admin/referenceApi.ts`.
- `src/routes.ts` — typed page URL builders, used instead of hardcoded route strings.

## Authentication & authorization

`/admin` is a shared workspace, not per-user data: every signed-in user can view companies, promotions, and statistics. There are three roles (`profiles.role`, `ProfileRoleType` in `src/enums.ts`):

| Role | Can view | Can create/edit/delete companies & promotions | Can manage roles (`/admin/users`) |
|---|---|---|---|
| `viewer` (default) | ✅ | ❌ | ❌ |
| `admin` | ✅ | ✅ | ❌ |
| `superadmin` | ✅ | ✅ | ✅ |

- `src/proxy.ts` + `src/lib/supabase/updateSession.ts` gate every `/admin` route behind a Supabase session (view access).
- `src/services/admin/permissions.ts` checks the current user's `profiles.role`: `assertAdmin`/`isCurrentUserAdmin` accept `admin` or `superadmin` and gate company/promotion mutations and their UI; `assertSuperAdmin`/`isCurrentUserSuperAdmin` accept only `superadmin` and gate `/admin/users` (both the page and the Sidebar nav item). Make sure your Supabase RLS policies enforce the same rules at the database level — the app-side checks are a safety net, not a substitute for it.
- New sign-ups default to `role = 'viewer'`; there is intentionally no role picker on the sign-up form (letting anyone self-select a privileged role would defeat the whole point). A `superadmin` promotes other users from `/admin/users`.
