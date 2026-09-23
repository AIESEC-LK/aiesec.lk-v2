# Partner Portal — Follow-up CBA: CMS (Payload vs Strapi) and Database (MongoDB vs Postgres)

**Context:** The earlier CBA (Payload CMS with built-in auth, free-tier database, $0 recurring) was accepted. Team discussion then raised two open questions: should we use Strapi instead of Payload, and should the database be MongoDB or Postgres (managed free tier or self-hosted on our Azure VM)? This document answers both and checks every claim raised in that discussion.

All facts verified against official docs / npm on 2026-09-23. Repo: https://github.com/AIESEC-LK/aiesec.lk-v2

---

## 1. Summary

| Decision | Recommendation | Fallback |
|---|---|---|
| CMS / backend | **Payload** (unchanged) | — |
| Database | **MongoDB Atlas free (M0)** | Neon free Postgres — equally valid |
| Hosting of DB | Managed free tier | Self-hosting on the VM **not** recommended |

- Payload fits inside our existing Next.js app; Strapi would be a second server, and can't use MongoDB at all.
- Mongo vs Postgres is close. Payload treats both as first-class. Atlas wins on "never sleeps, zero maintenance" and matches Payload's document-shaped data.
- One-time cost for Payload: upgrade Next.js 16.1.0 → 16.3.x (details in §2.3).

---

## 2. CBA 1 — Payload vs Strapi

### 2.1 Comparison

| Factor | Payload 3 | Strapi 5 |
|---|---|---|
| Where it runs | **Inside our Next.js app** (same repo, same container) | **Separate Node server** (new repo/folder, new container, new deploy pipeline) |
| Databases | MongoDB, Postgres, SQLite | Postgres, MySQL, MariaDB, SQLite — **no MongoDB** ("Strapi does not support MongoDB (or any NoSQL databases)") |
| How our custom HR/admin pages get data | **Local API** — direct function calls from server components/server actions. No HTTP, no CORS | REST/GraphQL over the network. Needs CORS, JWT storage, error handling on every call |
| Auth for HR reps | Built-in: `Users` collection with `auth: true`, roles + company field, same session cookie as the site | Two separate systems: admin-panel users (for AIESEC staff) and "Users & Permissions" plugin (JWT, for HR reps) |
| Built-in admin panel | Full admin UI; can stay as a hidden back-office for the tech team | Admin UI only brandable (logo, colours), not restructurable; not meant for HR reps |
| Custom UI in site style | Still needed (agreed in first CBA) — built with our existing `components/ui/` | Still needed — same work, plus API client plumbing |
| Licence / paid features | MIT, everything we need is free | Community edition MIT. SSO, audit logs, review workflows, content history are paid ($45/mo Growth or Enterprise). We don't need them now |
| Infra cost on our VM | None extra (same process) | Extra RAM/CPU for a second always-on Node process |
| Changes to existing Next app | Yes — Next.js upgrade + route restructure (§2.3) | None |
| Ops burden for rotating volunteers | One app, one pipeline | Two apps, two pipelines, two sets of secrets |

### 2.2 What gets added to our codebase (Payload)

Today: Next.js 16.1 App Router, the only backend is `app/api/health`, no auth, no DB. UI kit in `components/ui/` (button, card, input, textarea, toast, accordion, carousel) + Tailwind theme.

With Payload:
- `payload.config.ts` + collections as TypeScript files: `Partners`, `Opportunities`, `Users` (`auth: true`, `role`, `company`).
- `app/(payload)/` — Payload's admin + REST routes (generated).
- Existing pages move to `app/(frontend)/` (URLs don't change).
- New custom pages: `/become-a-partner`, HR dashboard, admin console — call the Local API directly.
- One-off seed script: `constants/patners.ts` → database.
- New env vars: `DATABASE_URI`, `PAYLOAD_SECRET`.

> ⚠️ **Security footgun:** Payload's Local API **skips access control by default**. Every HR/admin call must pass `user` and `overrideAccess: false`, otherwise one company could read or edit another company's opportunities. Needs a code-review rule and a test.

### 2.3 Next.js upgrade needed for Payload

- Payload's install docs say Next **16.2.6+**, but the current stable `@payloadcms/next` (**3.90.2** on npm) requires **Next ≥ 16.3.3**. We are on **16.1.0** (React 19.1.4). So: 16.1.0 → 16.3.x.
- Next.js 16.2 and 16.3 release notes list **no breaking changes** (performance improvements, new default error page, opt-in features). This is a minor-version bump.
- Actual changes in our code (driven by Payload's install requirements):

| # | Change | Why | Risk |
|---|---|---|---|
| 1 | `next.config.ts`: `module.exports = …` → `export default withPayload(…)` | Payload is ESM-only | Low — one file |
| 2 | Move `app/layout.tsx`, `page.tsx`, `partner/`, `partner-portal/`, `privacy-and-cookie-policy/`, `create-click-link/` into `app/(frontend)/` | Payload needs its own root layout in `app/(payload)/` | Low–medium — URLs unchanged, but `app/api/health` **must** keep working, the blue-green deploy depends on it |
| 3 | `tsconfig.json`: add `@payload-config` alias | Payload import path | Low |
| 4 | Dockerfile / GitHub secrets: add `DATABASE_URI`, `PAYLOAD_SECRET` | Runtime config | Low |
| 5 | Probably bump React 19.1 → 19.2 | Payload is built/tested against 19.2 | Low |
| 6 | (Existing warning) `images.domains` → `images.remotePatterns` | Deprecated since Next 16; fix while here | Low |

- Verify: `next build` passes, click through every existing page, `/api/health` returns OK, run the test deploy workflow before production.
- Estimated one-time effort: ~0.5–1 day.

### 2.4 Verdict

**Stay on Payload.** The Next.js upgrade is a one-time, low-risk cost. Strapi's costs are recurring (second server, second pipeline, network API plumbing, two auth systems) and it would rule out MongoDB. Strapi's only advantage — not touching the Next app — doesn't outweigh that at our scale (36 partners, ~9 live opportunities).

---

## 3. CBA 2 — MongoDB vs Postgres

### 3.1 Options

| | A. MongoDB Atlas M0 | B. Neon (Postgres) | C. Supabase (Postgres) | D. Self-host on our VM (Docker) |
|---|---|---|---|---|
| Cost | $0 forever | $0 | $0 | $0 extra (uses VM) |
| Storage | 512 MB | 0.5 GB / project | 500 MB | VM disk |
| Other limits | 500 connections, 100 ops/s, 10 GB/week transfer | 100 CU-hours/month, 5 GB egress | 2 active projects, 5 GB egress | VM RAM/CPU shared with the website |
| Idle behaviour | Pauses only after **30 days** with zero connections | **Sleeps after 5 min idle** (can't disable); first request after wakes it (short delay) | **Pauses after 1 week** unused; manual restore | Always on |
| Automated backups | No (use `mongodump`) | 6-hour history window only | No | No — we build it |
| Maintenance | None | None | None | Updates, security patches, disk, backups — all on us |
| Payload support | First-class (Mongoose adapter) | First-class (Drizzle adapter) | First-class (Drizzle adapter) | Either |
| Schema changes | No migrations needed | Payload-generated migrations | Payload-generated migrations | Depends on DB |
| Future vector search (RAG) | Yes, free (max 3 search/vector indexes) | Yes, pgvector | Yes, pgvector | Yes, manual setup |

Our data size: 36 partners, ~9 opportunities, a few dozen users. All options have >100× headroom.

### 3.2 Payload's own position

Payload docs: *"Payload has no opinion on which database you should ultimately choose."* Nearly every feature works on all adapters. Guidance: MongoDB for flexible fields/no migrations; Postgres for rigid structure and complex relations. Our data is a simple partner → opportunities (one-to-many) model — both fit.

### 3.3 Verdict

- **Recommend A — MongoDB Atlas M0.** Never sleeps in normal use, zero maintenance, no migrations to manage (useful with yearly volunteer turnover), matches Payload's document-shaped data.
- **B — Neon is an equal fallback** if the team prefers SQL. Accept the 5-minute sleep / cold-start delay (fine for a low-traffic HR dashboard).
- **C — Supabase: not recommended.** The 1-week pause is risky for a portal HR reps may only visit a few times a month.
- **D — Self-hosting: not recommended.** Saves nothing in money, adds backups, patching and disk monitoring to a rotating volunteer team, and competes with the live website for VM resources.

---

## 4. Claim check (from team discussion)

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 1 | "We can run this on free tiers" | ✅ **True** | Every option in §3.1 has >100× headroom for our data |
| 2 | "Postgres is actually better for Payload" | ❌ **False / overstated** | Payload docs: "no opinion"; both adapters are first-class |
| 3 | "Free-tier Postgres hosting is less generous than MongoDB" | ⚠️ **Mostly false** | Storage is the same (~0.5 GB). Real difference is idle behaviour: Atlas pauses after 30 days, Neon sleeps after 5 min, Supabase pauses after 1 week |
| 4 | "We could host Postgres ourselves" | ✅ **True, with cost** | Possible on the VM via Docker, but backups/patching/security become our job (§3.1 D) |
| 5 | "If the use case fits NoSQL, go with Mongo" | ✅ **True as a principle** | — |
| 6 | "Fitting trees into tables is hard and gets messy over time" | ⚠️ **True in general, doesn't apply here** | Payload generates and migrates the tables itself; our data is one-to-many, not a deep tree |
| 7 | "Payload supports both" | ✅ **True** | Mongo, Postgres, SQLite adapters |
| 8 | "Payload is document/JSON-like, fits Mongo" | ✅ **True** | Mongo stores Payload documents as-is; Postgres splits arrays/blocks into extra tables (done automatically) |
| 9 | "Azure only has VMs, no DB" | ❓ **Unverified** | Repo only shows a VM deploy. Needs someone with Azure portal access to confirm |
| 10 | (New) "Payload needs Next 16.2.6+" | ⚠️ **Outdated** | Current stable Payload (3.90.2) needs Next ≥ 16.3.3 |

---

## 5. Risks

| Risk | Mitigation |
|---|---|
| No automated backups on any free tier | Scheduled GitHub Action running `mongodump` (or `pg_dump`), store encrypted artifact |
| Cross-company data leak via Local API default | `overrideAccess: false` + `user` on every call; test that HR A can't see HR B's data |
| Next.js upgrade breaks a page or the health check | Upgrade in its own PR first; build + manual click-through + test deploy before prod |
| Free-tier terms change | Payload can switch adapters; data export via `mongodump`/`pg_dump` |
| Unknown Azure resources | Confirm what the subscription includes before final DB decision |

---

## 6. Next steps

1. Confirm Azure subscription contents (claim 9).
2. Agree on DB: Atlas M0 (recommended) or Neon.
3. PR 1: Next.js 16.1 → 16.3.x + ESM config + `(frontend)` route group. Verify `/api/health` and all pages.
4. PR 2: Add Payload + collections + seed script from `constants/patners.ts`.
5. PR 3: Custom UIs — `/become-a-partner`, HR dashboard, admin console.
6. Add backup GitHub Action.

---

*Related: `.docs/partner-portal-upgrade-cost-benefit-analysis.md` (accepted first CBA), `.docs/partner-portal-and-architecture.md` (current architecture).*
