# AGENTS.md

Guide for AI coding agents (and humans) working on **aiesec.lk-v2**, the public website of AIESEC in Sri Lanka.

## Stack

- **Next.js 16** (App Router, Turbopack for `dev` and `build`), **React 19**, **TypeScript**.
- **Tailwind CSS 4** (`app/(frontend)/globals.css`, `postcss.config.mjs`), **shadcn/ui**-style components in `components/ui` (Radix primitives, `class-variance-authority`, `tailwind-merge`).
- Animation/visuals: `framer-motion`, `three`, `embla-carousel`.
- Package manager: **npm** (`package-lock.json` is the source of truth; Docker runs `npm ci`). A stray `pnpm-lock.yaml` also exists — do not rely on it.
- Planned (in progress): **Payload CMS 3** inside this Next.js app, with **MongoDB Atlas**, for partner/admin logins. See `.claude/.docs/cms-and-database-cba.md`.

## Project layout

| Path | What it is for |
|---|---|
| `app/(frontend)/page.tsx`, `app/(frontend)/layout.tsx` | Home page and root layout (Poppins font, toast provider) |
| `app/(frontend)/partner-portal/` | Partner portal listing page |
| `app/(frontend)/partner/[slug]/` | Single partner page (company info + opportunities) |
| `app/(frontend)/create-click-link/` | Internal helper page for building tracked links |
| `app/(frontend)/privacy-and-cookie-policy/` | Legal page |
| `app/api/health/route.ts` | Health check used by the deploy script — **must keep returning 200** |
| `components/<Section>/` | One folder per home-page section; `subcomponents/` for its parts |
| `components/PartnerPortal/` | Partner portal UI |
| `components/ui/` | Shared UI primitives (button, card, input, toast, …) |
| `constants/` | Static site content. `constants/patners.ts` (sic) holds all partner and opportunity data today |
| `types/` | Shared TypeScript types (`types/partner.ts`: `Partner`, `Opportunity`) |
| `hooks/`, `lib/utils.ts` | Toast hook, `cn()` class helper |
| `.claude/.docs/` | Committed design/decision documents |
| `.claude/.local/` | Git-ignored local notes and plans (`plans/`) |

The public site still reads **hard-coded** content from `constants/`. Payload (admin panel at `/admin`) holds the same data in MongoDB: collections in `collections/`, access rules in `access/roles.ts` (roles: `admin`, `partner`; partners manage only their own company's opportunities).

## Build and run

- `npm run dev` — local dev server.
- `npm run build` — production build (`output: "standalone"`).
- `npm run seed` — copies the three /partner-portal partners (MAS, Cargills, Ceylinco Life) and their opportunities from `constants/patners.ts` into the database in `DATABASE_URL` (Payload). Safe to re-run: updates instead of duplicating. Point `.env` at your own test database first.
- `npm run generate:types` — regenerates `payload-types.ts` after changing collections (the dev server also does this).
- Husky `pre-push` hook runs `npm run build`; the push is blocked if the build fails.

## Deployment

1. GitHub Actions builds a Docker image (`Dockerfile`: multi-stage, `node:22-alpine`, `npm ci` → `next build` → standalone `server.js`) and pushes it to Docker Hub.
2. It then SSHes into the Azure VM, `cd`s to `SCRIPTS_PATH` and runs `deploy.sh`.
3. `deploy.sh` does a blue-green swap: start the new container on a temp port, check `/api/health`, then replace the old one (the old one is kept as `-old` for rollback).

| Branch | Workflow | Host port | Tag |
|---|---|---|---|
| `main` | `deploy.yaml` | 3000 | `aieseclk` (production) |
| `test` | `test_deploy.yaml` | 3001 | `aieseclktest` |

- `pull_request_test.yaml` builds PRs into `main` and `test` only.
- **The VM runs its own copy of `deploy.sh`.** Changing `deploy.sh` in git does not change the VM; it must be updated there by hand.
- `deploy.sh` currently passes **no environment variables** to the container. Anything that needs secrets (e.g. a database URL) must add that first.
- Nothing may need the database during `docker build` — CI has no database access.

## Git workflow

- Feature work happens on feature branches; **PRs target `dev`**. `dev` → `test` → `main` for release.
- **Conventional commits**, enforced by commitlint (`.commitlintrc.json`). Allowed types: `ci`, `chore`, `docs`, `ticket`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`. Format: `type(scope?): subject`.
- Keep commits small and incremental.
- **Never add a `Co-Authored-By` line** (or any AI attribution) to commits or PRs.

## Rules for AI agents

- **Gated workflow:** work through a plan one step at a time. After each step, **stop**, summarise the changes and suggest a commit message. The maintainer reviews and commits manually, then says when to continue. Never stage, commit or push.
- Do not run toolchain or git commands for the maintainer; explain what to run and what to expect.
- Explain in plain English; define jargon the first time it appears.
- Persist plans in `.claude/.local/plans/` (git-ignored).
- For every change, check its effect on the deployment described above.
- Verify library behaviour against current docs, not memory.
