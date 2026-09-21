# AIESEC in Sri Lanka — Website Architecture & Partner Portal Report

> Written for: a separate Claude chat session that has no access to this repository. Everything the reader needs to understand the current system is included below — no assumed prior context.

**Repository:** https://github.com/AIESEC-LK/aiesec.lk-v2

---

## 1. What this project is

This is the marketing / public website for **AIESEC in Sri Lanka**, a youth-leadership NGO. It's a single Next.js application covering the homepage, a partner-facing "Partner Portal" section, and a couple of utility pages. There is currently **no database and no CMS** — all content is hardcoded in TypeScript source files and shipped as part of the build.

---

## 2. Tech stack

- **Framework:** Next.js 16 (App Router), using Turbopack for both `dev` and `build`.
- **UI:** React 19, Tailwind CSS v4, shadcn/ui-style components (config in `components.json`, generated components live in `components/ui/`: accordion, button, card, carousel, input, textarea, toast/toaster).
- **Animation/misc libs:** Framer Motion (page/element animations), Three.js (`three`, `@types/three` — used for some 3D visual element), embla-carousel + embla-carousel-autoplay (carousels), lucide-react and react-icons (icon sets).
- **Language/tooling:** TypeScript, ESM. Husky + commitlint are configured so git commits must follow conventional-commit format (enforced via a pre-commit/commit-msg hook).
- **Package manager:** both `package-lock.json` and `pnpm-lock.yaml` exist in the repo (worth flagging as a minor inconsistency — two lockfiles present).

## 3. Site structure (routes)

All routes are under the Next.js `app/` directory (App Router):

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Homepage. Stacks these sections in order: Navigation → Hero → OurStory → Entities → ExploreOpportunities → OpportunitiesForPartners → OurPartners → FAQ → Contact → Footer. Each section is its own component folder under `components/`. |
| `/partner-portal` | `app/partner-portal/page.tsx` | Partner Portal landing page (see §4). |
| `/partner/[slug]` | `app/partner/[slug]/page.tsx` | One page per individual partner, e.g. `/partner/mas`, `/partner/cargills` (see §4). Statically generated at build time. |
| `/create-click-link` | `app/create-click-link/page.tsx` | A utility page (not explored in depth in this report). |
| `/privacy-and-cookie-policy` | `app/privacy-and-cookie-policy/*` | Static privacy/cookie policy page. |
| `/api/health` | `app/api/health/route.ts` | Health-check endpoint. Returns `{ status: "healthy", timestamp, uptime }` as JSON with HTTP 200. This is polled by the deployment script (see §6) to confirm a freshly deployed container is alive before it's promoted to serve production traffic. |

Root layout: `app/layout.tsx` sets up the Poppins font (via `next/font/google`), page `<title>`/meta description/keywords (SEO-oriented, mentions "30 years", "youth leadership", etc.), and mounts a global `<Toaster />` (toast notification component) alongside `{children}`.

## 4. The Partner Portal in detail

This is the part of the site that showcases companies that partner with AIESEC (offering internships/jobs to AIESEC members) — split into "National Partners" (Sri Lankan companies) and "Global Affiliation" (multinational companies).

### 4.1 Where the data lives (important — no database)

All partner data is **hardcoded in TypeScript**, not stored in any database or CMS:

- **`constants/patners.ts`** (note: filename has a typo, "patners" not "partners") — this is the canonical/full dataset. It exports two arrays:
  - `nationalPartners: Partner[]` — currently 17 entries (e.g. MAS Holdings, Cargills, Ceylinco Life, DIMO, RIDE, Emerald, Unilever, e-wis, Nestle, ADVANTIS, Right to Protein).
  - `globalPartners: Partner[]` — currently 25 entries (e.g. DHL, DP World, EATON, Electrolux, Nokia, PwC, SAP, EY, Accenture, TCS, etc.), mostly with minimal detail (just name/logo/category/one-line description).
  - Only a few partners (MAS, Cargills, Ceylinco Life) have the full rich profile filled in (see the `Partner` type below) — the rest have placeholder or one-line descriptions.
  - This file is what powers the `/partner/[slug]` detail pages.

- **`components/PartnerPortal/PartnersSection.tsx`** — has its **own separate, smaller hardcoded array** (`nationalTalentPartners`, only 3 entries: MAS, Cargills, Ceylinco Life) used just to render the "Featured Partners" cards on the `/partner-portal` landing page. **This duplicates a subset of `constants/patners.ts` and can drift out of sync** — e.g. adding a new featured partner today means editing two separate files by hand. There's also a commented-out "National Partners" grid section in this same file that references an (empty) `nationalPartners` local array and is currently disabled.

- **Data type** (`types/partner.ts`):
  ```ts
  type Opportunity = {
    title: string;
    description: string;
    deadline: string;
    applicationLink?: string;
  };

  type Partner = {
    name: string;
    logo: string;               // path to a static image under /public/images/partners/
    category: string;           // e.g. "National Partner", "National Talent Partner", "Global Affiliation"
    description: string;
    slug?: string;               // URL-friendly id, used for /partner/[slug] routing
    aboutCompany?: string;       // company blurb, <200 words intended
    partnerPortalVideo?: string; // YouTube embed URL
    whyPartner?: string;         // why the company partners with AIESEC
    collaboration?: string;      // description of the SL collaboration
    whyJoin?: string;            // pitch to AIESEC members for why to join this company
    opportunitiesList?: Opportunity[]; // job/internship postings
  };
  ```

- **Logos** are static files under `public/images/partners/*.png|jpg|avif`.

**Practical implication:** updating a partner's opportunity list, deadline, or bio today requires a developer to edit TypeScript source and go through the full CI/CD pipeline (commit → GitHub Actions build → Docker image → deploy to server) — there is no admin UI and no way for non-technical staff to self-serve content updates.

### 4.2 Page-by-page breakdown

**`/partner-portal` (landing page)** — `app/partner-portal/page.tsx` — renders, in order:
1. `Navigation` (site-wide nav, shared with homepage)
2. `PartnerHero` (`components/PartnerPortal/PartnerHero.tsx`) — full-viewport hero: background image (`/images/partnerPortal/PartnerPortalBG.jpg`) with a dark overlay, "Partner Portal" heading, an animated decorative underline SVG, subtitle copy, and a bouncing scroll-down arrow that anchors to `#partners`.
3. `PartnersSection` (`components/PartnerPortal/PartnersSection.tsx`) — section `id="partners"`. Renders a "Featured Partners" heading and a flex-wrapped grid of `PartnerCard` components built from the local hardcoded `nationalTalentPartners` array described above. A "National Partners" grid variant is present in code but commented out.
4. `Gallery` (`components/PartnerPortal/Gallery.tsx`) — a photo gallery grid of 6 hardcoded images (`/images/partnerPortal/Gallery/1_img.jpg` … `6_img.jpg`), each with a caption; clicking an image opens a full-screen lightbox modal (built with Framer Motion's `AnimatePresence`) with a close button.
5. `Footer` (shared with homepage)

**`PartnerCard.tsx`** (`components/PartnerPortal/PartnerCard.tsx`) — a flip/hover card, 64×72 (tailwind units) in size:
- Front face: partner logo, name, and a category pill (styled green for "National Talent Partner", blue otherwise).
- On hover: a black semi-transparent overlay fades in showing the partner's description and a call-to-action label — "Explore Opportunities →" for internal partners, "Learn More →" for external ones.
- If `partner.isInternal` is true, the whole card is a Next.js `<Link>` to `/partner/[slug]`; otherwise it's a plain `<a target="_blank">` to an external URL.
- Uses Framer Motion for a subtle scale/lift hover animation.

**`/partner/[slug]` (individual partner page)** — `app/partner/[slug]/page.tsx`:
- Server component. Awaits the dynamic `slug` param, then looks the partner up by searching **both** `nationalPartners` and `globalPartners` from `constants/patners.ts` for a matching `slug`.
- If no match is found, renders a "Partner Not Found" screen with a "Back to Home" link (still wrapped in `Navigation`/`Footer`).
- If found, renders `Navigation` → `PartnerDetails` (passing the found `partner` object) → `Footer`.
- `generateStaticParams()` pre-generates a static path for every partner in both arrays that has a `slug` set (Next.js static site generation — these pages are built once at build time, not rendered per-request, unless a slug is missing at build time).
- `generateMetadata()` currently returns a generic, non-partner-specific title/description ("Partner | AIESEC in Sri Lanka" / "Partner details page") — i.e. per-partner SEO metadata is not yet wired up even though the function exists.

**`PartnerDetails.tsx`** (`components/PartnerPortal/PartnerDetails.tsx`) — the main content component for a single partner:
- Client component (`"use client"`), holds two pieces of local UI state: `activeVideoModal` and `showOpportunitiesModal` (booleans).
- **Header:** a diagonal gradient background (orange → purple → blue → black), a back-arrow link to `/#partners` (i.e. back to the homepage's partner anchor — note this points at the homepage, not `/partner-portal#partners`), the partner's logo in a frosted-glass card, name, category, and description.
- **Main content column** (2/3 width on large screens), each section only rendered if the corresponding data field is present and doesn't contain the string "coming soon":
  - "About the Company" (`aboutCompany`, always rendered — falls back to a "coming soon" placeholder string if missing)
  - An embedded YouTube video (`partnerPortalVideo`) shown inside an iframe with a play-button overlay that opens on click (state `activeVideoModal` is set but the modal itself doesn't appear to be implemented separately — the iframe is inline, not behind a lightbox; worth double-checking if this was meant to open a bigger modal)
  - "Why Partner with AIESEC?" (`whyPartner`)
  - "The Collaboration Between {name} and AIESEC in Sri Lanka" (`collaboration`)
  - "Why Should an AIESECer Join?" (`whyJoin`)
- **Sidebar** (1/3 width, sticky): a "Quick Info" card repeating company name and category, plus an "Explore Opportunities" button that opens the opportunities modal.
- **Bottom CTA band:** "Ready to Join?" with another "Explore Opportunities" button.
- **Opportunities modal** (`showOpportunitiesModal`): a full-screen overlay with a scrollable panel listing every entry in `partner.opportunitiesList`, each showing title, a "Deadline: X" pill, a `whitespace-pre-line` description (so `\n` characters in the hardcoded strings render as line breaks — this is how bullet lists are currently faked in the data), and an "Apply Now" external link button if `applicationLink` is set. If the list is empty, shows a "No opportunities available at the moment" message.

### 4.3 Known inconsistencies / rough edges (as observed, not yet fixed)
1. **Duplicate data source**: `PartnersSection.tsx`'s local `nationalTalentPartners` array duplicates a subset of `constants/patners.ts`. Two places to edit for the same 3 "featured" partners.
2. **Filename typo**: `constants/patners.ts` (missing the "r" in "partners").
3. **Generic per-partner metadata**: `generateMetadata()` on the `/partner/[slug]` page doesn't use the actual partner's name/description — all partner pages currently share the same page title/description for SEO/social sharing purposes.
4. **Back-link target**: `PartnerDetails.tsx`'s back arrow points to `/#partners` (homepage anchor) rather than `/partner-portal#partners`.
5. **Two lockfiles**: both `package-lock.json` and `pnpm-lock.yaml` exist, suggesting mixed use of npm and pnpm across contributors/environments.
6. **No CMS/database**: all content edits require a code change + redeploy; there is no self-service way for non-developers to update partner info, opportunities, or deadlines.

## 5. Recent security-relevant history (from git log)

The two most recent commits before this report was written were:
- `Github Actions Security` — hardening changes to the GitHub Actions workflows.
- `Remove malicious workflow` — a workflow file that was determined to be malicious was removed from `.github/workflows/`.

This suggests the repo's CI/CD configuration was audited/cleaned up recently; worth being cautious and reviewing any workflow changes carefully given that history.

## 6. Deployment & hosting architecture

The site is **not** deployed on Vercel/Netlify — it's self-hosted via Docker on an Azure VM, using a custom blue-green deployment script triggered by GitHub Actions.

### 6.1 Build (`Dockerfile`)
Multi-stage Docker build:
1. **`deps` stage**: Node 22 Alpine base, installs `libc6-compat`, then runs `npm ci` from `package.json` + `package-lock.json` (this is the "install everything" stage).
2. **`builder` stage**: copies in `node_modules` from `deps` plus the full source, sets `NEXT_TELEMETRY_DISABLED=1` and `NODE_ENV=production`, then runs `npm run build` (which is `next build --turbopack`). Next.js is configured with `output: "standalone"` (see `next.config.ts`), so the build produces a minimal, self-contained `.next/standalone` server bundle. The Dockerfile explicitly checks that `.next/standalone` exists and fails the build (`exit 1`) if it's missing.
3. **`runner` stage**: fresh Node 22 Alpine image, creates a non-root user/group (`nextjs`/`nodejs`, uid/gid 1001) for security, copies in `public/`, the standalone server output, and `.next/static`, then runs as that non-root user. Exposes port 3000, sets `PORT=3000` and `HOSTNAME="0.0.0.0"`, and starts the app with `node server.js` (the entrypoint Next.js generates for standalone output).

### 6.2 `next.config.ts` highlights
- `output: "standalone"` — required for the slim Docker image above.
- `experimental.optimizePackageImports` for `lucide-react` and `@radix-ui/react-icons` (bundle-size optimization).
- `compress: true`.
- `images`: allows `webp`/`avif` formats, whitelists external image domains `aiesec.lk`, `www.logos.aiesec.org`, `aiesec-logos.s3.eu-west-1.amazonaws.com` (an S3 bucket — likely where some official AIESEC logos are hosted), and sets `minimumCacheTTL: 60`.

### 6.3 CI/CD pipelines (`.github/workflows/`)
Three workflow files:
- `pull_request_test.yaml` — presumably runs tests/checks on PRs (not examined in depth for this report).
- `test_deploy.yaml` — triggers on push to the **`test`** branch (or manual `workflow_dispatch`). Builds the Docker image, pushes it to Docker Hub as `${DOCKERHUB_USERNAME}/asldevteam:aieseclktest`, then SSHs into the Azure VM and runs `deploy.sh` with `HOSTPORT=3001`, `TEMP_PORT=8083`, `CONTAINERPORT=3000`, `TAG=aieseclktest` — i.e. this is the **staging** deploy, served on port 3001.
- `deploy.yaml` — triggers on push to **`main`** (or manual `workflow_dispatch`). Same flow, but pushes as `${DOCKERHUB_USERNAME}/asldevteam:aieseclk` and deploys with `HOSTPORT=3000`, `TEMP_PORT=8080`, `CONTAINERPORT=3000`, `TAG=aieseclk` — i.e. this is the **production** deploy, served on port 3000.

Both deploy jobs:
1. Log in to Docker Hub using `secrets.DOCKERHUB_USERNAME` / `secrets.DOCKERHUB_TOKEN`.
2. Set up Docker Buildx and build+push the image for `linux/amd64`, using GitHub Actions cache (`cache-from`/`cache-to: type=gha`).
3. Set up an SSH agent using `secrets.AZURE_SSH` (private key) and add the Azure host to known_hosts via `ssh-keyscan` using `secrets.AZURE_HOST`.
4. SSH as `secrets.AZURE_USER` into `secrets.AZURE_HOST`, `cd` into `secrets.SCRIPTS_PATH`, export the environment variables above, and run `./deploy.sh`.

So there is a **single Azure VM** hosting both a production container (port 3000) and a staging/test container (port 3001), both managed by the same `deploy.sh` script and Docker Hub repo (`asldevteam`), differentiated by tag.

### 6.4 `deploy.sh` — the blue-green deployment logic
Runs on the Azure VM (bash script). Requires env vars `APP`, `TAG`, `TEMP_PORT`, `HOSTPORT`, `CONTAINERPORT` to be set (fails fast with a clear error if any are missing). Logic:
1. `docker pull $APP:$TAG` — pulls the freshly-built image.
2. Retags it locally as `$APP:new` and removes the original pulled tag (cleanup).
3. Starts a **new** container named `${TAG}-new` on the **temporary** port (`TEMP_PORT` → `CONTAINERPORT`), with `--restart unless-stopped`.
4. **Health check loop**: up to 10 attempts, 3 seconds apart, curling `http://localhost:${TEMP_PORT}/api/health` (this is exactly the endpoint defined in `app/api/health/route.ts`). This is the health check / smoke test gate before promoting the new version.
5. **On success**:
   - Stops the currently-running production container (`${TAG}-current`) if one exists, removes any old backup (`${TAG}-old`), renames the current one to `${TAG}-old` (kept as a rollback point), and removes the old `$APP:old` image tag.
   - Stops the temp container, then restarts it under the name `${TAG}-current` bound to the real `HOSTPORT` — this is the actual traffic cutover.
   - Retags `$APP:new` as `$APP:current`, cleans up the `:new` image tag.
   - This is effectively a **blue-green deploy with automatic rollback capability** (the previous container is kept around as `-old` rather than deleted immediately).
6. **On failure** (health check never passes after 10 tries, or any docker command fails): the `handle_error` function logs the error, removes the failed temp container/image, and — in the case of a mid-cutover failure — attempts to restart the previous (`-old`) container to restore service. The script exits non-zero, which will also mark the corresponding GitHub Actions run as failed.

### 6.5 Secrets used (names only, values are not in this repo)
`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `AZURE_SSH` (private key), `AZURE_HOST`, `AZURE_USER`, `SCRIPTS_PATH` — all managed as GitHub Actions repository secrets, not committed to source.

## 7. Summary for planning purposes

If the next step is to plan improvements (e.g. making partner data editable without a code deploy, fixing the data-duplication issue, wiring up per-partner SEO metadata, etc.), the key constraints to design around are:
- **No database currently exists** — introducing one (or a headless CMS, or even just a JSON file fetched at runtime) would be a new architectural component, not a swap of an existing one.
- **The build bakes in all content** — anything read from `constants/patners.ts` becomes part of the static bundle at `next build` time; changing it live (without a redeploy) would require moving that data to be fetched at runtime instead (e.g. an API route, an external CMS, or ISR/revalidation if staying within Next.js data-fetching patterns).
- **Deploys are already automated end-to-end** (push → GitHub Actions → Docker Hub → Azure VM blue-green swap), so any content-workflow change should ideally avoid requiring a full redeploy for routine content edits, since a redeploy currently means a multi-minute CI pipeline plus a container swap.
- **Two environments exist** (`test` branch → staging on port 3001, `main` branch → production on port 3000) on the same VM, which can be used to validate any changes before they hit production.
