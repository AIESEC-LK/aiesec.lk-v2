# Partner Portal Self-Service Opportunity Management — Cost-Benefit Analysis

**Prepared for:** Lasal Rathnayake (relaying requirements from Ijas Ahamed, VP Business Development)
**Subject:** Replacing the spreadsheet + manual copy-paste process with a self-service Partner Portal, and evaluating Payload CMS / Clerk as the tools to build it

---

## 1. Executive Summary

**Recommendation: build this on Payload CMS, using Payload's own built-in login system (no Clerk needed), backed by a free managed Postgres database. Estimated new recurring cost: $0.**

Right now, partner HR reps fill in a shared spreadsheet, and an AIESEC team member manually copies each opportunity into the website's code before it goes live. This is slow, error-prone, and doesn't scale — proof of that is in the numbers below (Section 2).

You asked specifically whether **Payload** (an open-source tool that gives you a ready-made login system + admin panel + database structure, without writing it from scratch) and/or **Clerk** (a paid login-and-accounts service) are the right tools here. Short answer:

- **Payload alone is enough.** It already includes everything needed for "each company logs in and only sees their own opportunities" — we don't need to pay for Clerk on top of it.
- We do need **one new piece of infrastructure we don't have today: a database** (a place to store the opportunities data instead of it living inside the website's code). Free options exist that comfortably cover our scale.
- We also checked a "no new tools at all" approach (Section 4, Option E) — it's technically possible but doesn't actually deliver what was asked for (a real login and dashboard), so we don't recommend it.

---

## 2. Why This Is Needed (Current Process, With Real Numbers)

Today: HR reps → shared spreadsheet → AIESEC volunteer manually copies into website code → redeploy website.

We checked exactly how well this is working in practice by looking at what's actually live on the Partner Portal right now:

- **36 partner companies** are listed on the portal (11 Sri Lankan/national partners, 25 global affiliate companies).
- **Only 3 of those 36** — MAS Holdings, Cargills, and Ceylinco Life — currently have any job/internship opportunities showing at all.
- Across the entire site, there are only **9 individual job postings** live, total.

In other words: the manual process isn't just slow, it's a bottleneck that's stopping the vast majority of our partner relationships from ever turning into visible opportunities for AIESEC members. This isn't a hypothetical problem — it's already visibly happening.

---

## 2a. Additional Problem Found: The Portal Is Currently Serving the Wrong Audience

While looking into this, we found a real, already-live problem worth flagging on its own — separate from the spreadsheet issue, and worth fixing either way.

On the homepage, there's a section that pitches _companies_ on partnering with AIESEC, ending in a "Become a Partner" button. Right now, that button sends the person straight to `/partner-portal` — but `/partner-portal` is actually the page built for **students**: it lists existing partner companies and their job openings for students to browse and apply to. So today, a company interested in becoming a partner clicks "Become a Partner" and lands on a page with no pitch, no contact form, and no clear next step for them — it's the wrong page for who they are.

This matters more once we add the self-service system, because we're about to introduce two _more_ audiences into the same space (HR reps managing their own listings, and our own admin team). If we don't separate these clearly now, the confusion compounds. In total, there are **four distinct audiences** that each need their own clearly separated screen:

1. **Public visitors / students** — browsing partners and opportunities. This is what `/partner-portal` already does correctly today; no change needed here beyond what's already planned.
2. **Prospective partner companies** — need a dedicated **"Become a Partner" page** (a new page, not `/partner-portal`) with the partnership pitch and a way to get in touch (a contact form and/or Ijas's contact details, per the Contact Us update below) to start the onboarding conversation.
3. **Existing partner HR reps** (logged in) — the new self-service area: log in, then add/edit/close only their own company's opportunities.
4. **Our own AIESEC admin team** (logged in) — an oversight screen to see and manage all partner accounts and opportunities across every company.

We've folded this into the recommended setup below (Section 5) so the plan accounts for all four from the start, rather than bolting screens 3 and 4 onto the existing two and making the mix-up worse.

---

## 3. What Was Asked For (Requirements Checklist)

Restating Lasal/Ijas's requirements so it's clear the plan below addresses all of them:

- [ ] A separate login for each partner company / HR representative
- [ ] A dashboard for HR reps to view and manage their company's opportunities
- [ ] Ability to add new opportunities
- [ ] Ability to edit, update, close, or remove existing opportunities
- [ ] Opportunity fields: job title, company, description, requirements, location, employment type, deadline, application link, and other relevant details
- [ ] A clean, modern, professional interface suitable for corporate partners
- [ ] A smooth experience that removes the need for spreadsheets
- [ ] An admin side for the AIESEC team to monitor/manage all partner accounts and opportunities
- [ ] Access control — each company can only manage its own opportunities
- [ ] Contact Us section update: add **Ijas Ahamed** (VP Business Development) as a named contact with name, designation, contact details, and profile picture, styled to match the portal

Every one of these is addressed by the recommended approach below, except the last one (Contact Us), which is a small, independent task that doesn't depend on any of this and can be done immediately regardless of what's decided for the rest.

---

## 4. Options Considered

| Option                                          | What it is                                                                                                                                    | New recurring cost                                                                    | Relative effort                                                                                             | Meets all requirements?                              |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **A. Payload CMS (recommended)**                | Payload provides login, roles, per-company data isolation, and an admin panel out of the box; we build a branded dashboard on top for HR reps | $0 (self-hosted, free-tier database)                                                  | Medium                                                                                                      | Yes                                                  |
| B. Payload + Clerk                              | Clerk handles login/companies, Payload handles the opportunity data                                                                           | $0 now, but likely $100+/month once we need Clerk's company-accounts feature properly | Medium-High (two systems to wire together)                                                                  | Yes, but at avoidable extra cost and complexity      |
| C. Clerk + fully custom-built backend (no CMS)  | Clerk for login, but we hand-build everything else Payload would've given us for free                                                         | $0-25/month                                                                           | High (most code to write ourselves)                                                                         | Yes, but most expensive in effort                    |
| D. Supabase alone (DB + built-in login, no CMS) | A solid alternative to Payload — also free, also has built-in auth                                                                            | $0                                                                                    | Medium-High (no ready-made admin panel, so we'd hand-build the dashboard _and_ the admin oversight screens) | Yes, but more work than Option A for the same result |
| E. No CMS, no database, no login system at all  | Automate the _spreadsheet step_ instead of replacing it — a Google Form auto-updates the website's code via a script, no accounts needed      | $0                                                                                    | Low to build, but doesn't solve the actual ask                                                              | **No** — see below                                   |

### Why not Clerk (Options B/C)?

Clerk is a genuinely good product, but it's built to be paid for once you use it seriously. Its free plan covers login for up to 50,000 users — far more than we need — but the specific feature that maps to "one account per company" (Clerk calls this "Organizations", with a "B2B" mode) costs **an extra $100/month** once you need it properly, on top of $25-$300/month plans. Payload gives us the equivalent capability — logins, roles, "this company can only see its own data" — for free, because it's self-hosted and open-source. Paying for Clerk here would be paying for something we already get for free elsewhere.

### Why not Option D (Supabase alone)?

Supabase is a very reasonable choice technically — it also gives free login and a free database. The difference is that **Payload additionally gives us a ready-made admin control panel and a structured way to define "opportunity" as a data type with all its fields** (title, deadline, description, etc.) without us coding that from scratch. With Supabase alone, we'd have to hand-build both the HR dashboard _and_ the admin oversight screens ourselves. Payload does more of that work for us out of the box, which matters given our team is small and rotates every year.

### Why not Option E (no new tools at all)?

We specifically checked this since it would mean zero new infrastructure. The idea: keep using a form (like the current spreadsheet) but write a script that automatically turns form submissions into website updates, removing the manual copy-paste step.

This is the cheapest option in terms of infrastructure, but it **does not actually satisfy what was asked for**:

- There's no real login or dashboard — the explicit ask was "a separate login/account... they should be able to log in to the Partner Portal." A form is not a login.
- Access control is weak-to-nonexistent. Either everyone shares one form (no isolation between companies at all), or each company gets a secret unguessable link instead of a password — and if that link ever leaks (forwarded in an email, saved in a shared drive), anyone with it can edit that company's listings indefinitely, with no way to revoke it like you would a password.
- There's still no proper admin screen for the AIESEC team to monitor everything — we'd be back to "checking a spreadsheet," just a fancier one.
- Two people submitting or editing at the same time can conflict awkwardly, since there's no proper database keeping track of who changed what.

In short: this converts "manual copy-paste by us" into "manual monitoring by us," which is an improvement, but it isn't the self-service system that was actually requested. We mention it for completeness since it was asked about, but we don't recommend it as the path forward.

### Database choice: Postgres vs MongoDB

Payload needs a real database to store the opportunity data in (today, the website has none — everything is hardcoded into the code itself, which is exactly why every update needs a developer). Payload works equally well with either of the two common types of free database:

- **Postgres** (e.g. via **Neon** or **Supabase**, both have solid free tiers)
- **MongoDB** (e.g. via **MongoDB Atlas**, also has a solid free tier)

We recommend **Postgres**, because our data (partners, opportunities, users, companies) is naturally structured/tabular — a good fit for Postgres — and it's Payload's most mature, best-supported option. Between Neon and Supabase specifically: Supabase's free database can pause itself after 7 days of no activity (a minor inconvenience — it just needs a visit to "wake up," no data is lost), while Neon doesn't have that specific behavior. Either is a fine, genuinely free choice for our scale (36 partners is tiny by these platforms' standards).

Side note: both Postgres (via pgvector) and MongoDB Atlas support vector search on their free tiers (Atlas caps at 3 combined search/vector indexes on Free/Flex; Postgres has no comparable cap). Not a factor in the recommendation above — see the "Amzal's Suggestion" section near the end for detail.

---

## 5. Recommended Setup, In Plain Terms

Think of it like this:

- **Payload** becomes the "back office" — it manages logins, remembers who belongs to which company, stores every opportunity, and gives our own AIESEC team a built-in control panel to see and manage everything across all partners.
- A **free database** (Postgres, via Neon or Supabase) is where all of that data actually lives, instead of inside the website's code like today.
- This runs alongside the existing website on the same Azure server we already pay for and already have a working deployment pipeline for — no new hosting bill.

Following the four-audience breakdown from Section 2a, this means **four separate screens/pages** going forward, each built for exactly one audience:

| #   | Screen                          | Who it's for                         | Notes                                                                                                                                                                                     |
| --- | ------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `/partner-portal` (existing)    | Students / public visitors           | Kept as-is — browsing partners and opportunities. No change to its purpose.                                                                                                               |
| 2   | **New** "Become a Partner" page | Prospective partner companies        | The homepage's "Become a Partner" button gets re-pointed here instead of to `/partner-portal`. Pitch content + a way to get in touch (contact form and/or Ijas's details from Section 8). |
| 3   | **New** HR login + dashboard    | Existing partner HR reps (logged in) | Add/edit/close/remove only their own company's opportunities.                                                                                                                             |
| 4   | **New** admin oversight console | AIESEC admin team (logged in)        | See and manage all partner accounts and opportunities across every company.                                                                                                               |

**Important design note:** screens 2, 3, and 4 will all be **custom-built to visually match the rest of the AIESEC website** — same colors, fonts, and component style already used across the site — not Payload's default admin panel look. Payload only supplies the data storage, login system, and API underneath; every screen a human actually sees (HR reps _and_ our own admin team) gets its own matching interface built on top of it, so the whole experience feels like one coherent AIESEC product rather than a website bolted onto a generic back-office tool.

---

## 6. Rough Effort Breakdown

Given this is a volunteer-run project with a small team, here's the relative size of each piece of work (not exact hours, since that depends on who's building it):

| Phase                                                                | Relative effort                                                |
| -------------------------------------------------------------------- | -------------------------------------------------------------- |
| Set up Payload + free database + logins + per-company access rules   | Medium                                                         |
| Build the branded HR dashboard (add/edit/close opportunities)        | Medium                                                         |
| Set up the admin oversight view for the AIESEC team                  | Small-Medium (much of this comes free with Payload)            |
| Build the new "Become a Partner" page + re-point the homepage button | Small — a content/contact page, not an application screen      |
| Move the existing 36 partners' data into the new system              | Small                                                          |
| Contact Us section update (Ijas's profile)                           | Small — independent of everything else, can be done right away |

---

## 7. Risks & Things To Watch

- **Data isolation must be tested carefully.** The whole point of this system is that Company A can never see or edit Company B's opportunities. Payload's multi-company feature handles this well, but it's the kind of thing that needs to be explicitly tested before go-live — a mistake here would be a real trust issue with corporate partners, not just a bug.
- **Free database limits.** The free tiers we'd use are generous for our size (36 partners, a handful of opportunities each), but it's worth knowing they exist so nobody is surprised later if AIESEC in Sri Lanka's partner list grows dramatically.
- **Volunteer handover.** Since the team running this changes every year, we should make sure whoever builds this leaves clear setup notes — this matters more for us than for a company with permanent staff, since knowledge can otherwise walk out the door each transition. The good news: our deployment pipeline (documented separately) is already solid and automated, which removes one common source of "nobody remembers how this works" risk.

---

## 8. Contact Us Section Update

Separately from the above, add **Ijas Ahamed, VP Business Development**, as a named contact person on the Contact Us section of the site — name, title, contact details, and a profile picture, styled to match the rest of the portal's design. This is a small, self-contained task and doesn't need to wait on any of the decisions above.

---

## 9. Recommendation & Next Steps

**Recommendation:** Build the self-service Partner Portal on **Payload CMS with its own built-in login system** (no Clerk), backed by a **free-tier Postgres database** (Neon or Supabase). This meets every requirement Ijas listed, at no new recurring cost, and gives the AIESEC team a working admin panel "for free" as part of the same tool.

Suggested next steps:

1. Confirm this direction with Ijas.
2. Pick between Neon and Supabase for the database (minor decision, either works).
3. Get Ijas's photo and contact details for the Contact Us update — this can ship independently and immediately, and also feeds the new "Become a Partner" page's contact section.
4. Confirm the pitch content for the new "Become a Partner" page with Ijas (what should be said to a prospective company).
5. Once confirmed, move into detailed implementation planning (the four screens from Section 5, exact opportunity fields, account setup process for partner companies, etc.).

---

> ## Amzal's Suggestion: RAG (optional)
>
> Not requested, not part of the core recommendation — flagging a low-cost future option.
>
> RAG (retrieval-augmented generation): future natural-language search over opportunities data, grounded in live DB content (e.g. "which partners have marketing internships open?").
>
> - Neon/Supabase (pgvector) and MongoDB Atlas (native vector search) both support vector indexes on their free tiers.
> - Atlas free/Flex: max 3 search+vector indexes combined, 3KB index definition size, 300 fields/index. Fine at our scale (36 partners, low-hundreds of opportunities, 1-2 indexes needed).
> - Supabase/Neon pgvector: no comparable index-count cap; Supabase free tier holds ~tens of thousands of embeddings.
> - Net: Postgres+pgvector and MongoDB Atlas Vector Search are equivalent options here — not a reason to prefer one DB over the other.
> - No decision needed now — whichever DB is chosen in Section 4 already supports this later at $0.

---

_This report should be read alongside the earlier "Website Architecture & Partner Portal" report in this same folder, which covers how the current site and its deployment pipeline work in more technical detail._
