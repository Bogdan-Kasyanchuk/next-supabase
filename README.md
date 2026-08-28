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
   - Tables: `companies`, `promotions`, `profiles`, `categories`, `countries`
   - Views: `companies_by_category`, `companies_by_country`, `general_statistics`
   - RPC: `user_email_exists(check_email text) returns boolean` — called during sign-up to reject duplicate emails before `auth.signUp`
   - Row Level Security policies that restrict `companies`/`promotions` writes to their owning `user_id`. The app also checks ownership itself in `src/services/admin/*Api.ts`, but RLS should be the actual source of truth.

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
- `src/datasets/constants.ts` — app-wide constants and reference data (env-derived config, category/country/status option lists, statistics labels).
- `src/routes.ts` — typed page URL builders, used instead of hardcoded route strings.

## Authentication & authorization

- `src/proxy.ts` + `src/lib/supabase/updateSession.ts` gate every `/admin` route behind a Supabase session.
- Every company/promotion mutation in `src/services/admin/*Api.ts` also checks that the resource belongs to the current user (`user_id` on `companies`, resolved through `company_id` for `promotions`). Make sure your Supabase RLS policies enforce the same rule at the database level — the app-side check is a safety net, not a substitute for it.
