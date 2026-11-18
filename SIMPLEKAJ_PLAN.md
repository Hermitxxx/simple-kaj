# SimpleKaj: Production Full-Stack Plan (Agent Edition)

> Audience: an AI coding agent (Claude Code or similar) and the human owner.
> Usage: keep this file in the repo root as `PLAN.md`. Copy section 1 into `AGENTS.md` / `CLAUDE.md`.
> Rule of thumb: if this file and the code disagree, stop and ask the owner which is right.

---

## 0. Product Summary

SimpleKaj is a hyperlocal task marketplace for Bangladesh. A **poster** describes a small errand (buy food, drop a parcel, stand in a queue, minor repair). A nearby **worker** accepts it, completes it, and gets paid. The platform keeps a commission.

- Launch scope: **one zone** (one campus or one Dhaka neighborhood).
- Currency: BDT. Languages: Bangla and English.
- Clients: mobile-first PWA. Native wrapper later.

---

## 1. Agent Operating Rules (copy into AGENTS.md)

### 1.0 One task at a time (highest-priority rule)
1. Work on **exactly one backlog task** (section 17) at a time. Never start a second task, even if it looks small or closely related.
2. Do not "also fix" unrelated things. If you spot something else (a bug, a refactor, a missing feature), do not do it. Add it to the **Parking Lot** at the bottom of `docs/PROGRESS.md` and mention it in the completion report.
3. A task is finished only when its Definition of Done (section 1.2) is fully ticked. If it can't be finished, stop and report what is blocking it instead of moving on.
4. **After finishing a task, stop.** Do not begin the next task until the owner replies with a go-ahead or picks one.

### 1.0.1 Completion report (post this every time a task finishes)
When a task is done, end your reply with this exact block:

```
✅ TASK COMPLETE: <task number and name>

What I did
- <3-5 bullets of what changed, in plain language>

Skills used
- <skill names, and whether each was pre-installed, newly installed, or newly created>

Proof it works
- Typecheck / lint / tests: <pass or fail, with counts>
- How to try it: <exact commands or URL steps for the owner to verify>

Definition of Done: <n>/<total> ticked  (list anything not ticked and why)

Owner reminders
- <env vars, secrets, accounts, or decisions the owner must handle now>
- <anything from section 18 (Open Decisions) that this task touched>
- Please review and commit/merge before we continue.

Parking Lot (new items found, NOT done)
- <item> or "none"

👉 SUGGESTED NEXT TASK: <task number and name>
Why this one: <1-2 sentences: dependencies unlocked, risk reduced, or value delivered>
Alternatives: <1-2 other valid tasks and when they would make more sense>
Reply "go" to start the suggested task, or name a different one.
```

How to choose the suggested next task:
- Respect dependencies in section 17 order unless there is a strong reason not to.
- Prefer the task that unblocks the most other work or reduces the biggest risk (money, auth, security) early.
- If the owner has an unanswered Open Decision (section 18) that blocks the next task, suggest resolving that decision first.
- Keep a running `docs/PROGRESS.md` with: done tasks (with date), current task, next suggested, and the Parking Lot. Update it as part of every task.

### 1.0.2 Skills first (second-highest-priority rule)
**Do nothing without a skill.** Before starting any task (or any meaningful step inside it), the agent must find and use the relevant skill. Work done "from memory" when a skill exists or could exist is a violation.

Procedure, in this order, for every task:
1. **Check installed skills** (`.claude/skills/` or the agent's project skills folder, and `npx skills list`). If a relevant skill exists, read its `SKILL.md` fully and follow it.
2. **If none is installed, search for one:** run `npx skills find "<topic>"`, browse skills.sh, and check official vendor repos (framework, library, and cloud docs). Prefer official or vendor-maintained sources.
3. **Vet before installing.** Read the `SKILL.md` and every script in it. Do not install a skill that runs unexplained commands, fetches remote code, reads secrets, or touches files outside the project. Tell the owner which skill you chose and why, then install at **project level** (not global) so it is committed with the repo.
4. **If no suitable skill exists anywhere, create one.** Use the `skill-creator` skill to write a new project skill in `.claude/skills/<kebab-name>/SKILL.md`. Base it on official documentation and this plan (cite the sources inside the skill), keep it short and specific, then use it for the task. Ask the owner to review any newly created skill before it is relied on for money, auth, or security work.
5. **Name the skills used** in every completion report (section 1.0.1). If a task was done with no skill, say why and what you checked.

Skills do not override this plan. If a skill conflicts with a hard invariant (section 1.3) or the owner's decisions, follow the plan and flag the conflict to the owner.

The recommended starting set and the project's custom skills are listed in **section 21**.

### 1.1 Working agreement
1. Work in small vertical slices. One slice = schema + service + API + UI + tests.
2. Before coding a slice, state the plan in 5 lines or fewer, then implement.
3. Never invent library APIs. For Better Auth, Drizzle, Next.js, PostGIS, and payment gateways, read the current official docs first. Versions change.
4. Do not add dependencies without a one-line justification in the PR description.
5. Never commit secrets. Never print secrets in logs.
6. Never run destructive commands against production (drop, truncate, force push, reset). Ask first.
7. If requirements are ambiguous or a rule below conflicts with the task, ask one precise question instead of guessing.

### 1.2 Definition of Done (every slice)
- [ ] Relevant skill(s) found, read, and followed (section 1.0.2), and named in the completion report
- [ ] Types pass (`pnpm typecheck`), lint passes (`pnpm lint`), no `any` without a comment
- [ ] Unit tests for business rules; integration tests for DB-touching services
- [ ] Input validated with Zod at every boundary
- [ ] AuthN and AuthZ checked server-side (never trust the client)
- [ ] Errors mapped to the standard error shape (section 8.3)
- [ ] Structured logs, with no PII (phone, NID, address) in plain text
- [ ] Migration is forward-only, reversible by a follow-up migration, and tested on a copy of seed data
- [ ] Works at 360px width, keyboard accessible, Bangla text does not overflow
- [ ] Docs updated (README, `docs/`, ADR if a decision was made)

### 1.3 Hard invariants (never violate)
- Money is stored as **integer poisha** (1 BDT = 100 poisha). Never floats.
- Money movement is recorded only through the **ledger service** (section 7).
- Task status changes happen only through the **task state machine** (section 6).
- Exact task address and phone numbers are hidden from everyone except the poster and the accepted worker.
- Every state-changing endpoint is authenticated, rate limited, and audit-logged.
- A user can only read or modify their own resources unless they hold an admin role.

---

## 2. Goals, Non-Goals, and Targets

### 2.1 Goals (v1)
- Phone-OTP signup, post tasks, nearby feed, accept, complete, confirm, rate.
- Cash-on-completion with commission tracking, then online payments with escrow.
- Worker verification, reports, disputes, admin tooling.

### 2.2 Non-goals (v1)
- Multi-city operation, bidding or auctions, subscriptions, native apps, in-app voice or video, insurance.

### 2.3 Service-level targets
| Metric | Target |
|---|---|
| API p95 latency (feed, detail) | < 400 ms from Dhaka |
| Task accept success (no double-book) | 100% correctness |
| Availability | 99.5% monthly (solo ops), 99.9% later |
| OTP delivery time p95 | < 20 s |
| Time to first task view (LCP, 4G) | < 2.5 s |
| RPO / RTO | 24 h or less / 4 h or less (tighten after launch) |

---

## 3. Architecture

### 3.1 Style
A **modular monolith**: one Next.js app and one Postgres database, with strict internal module boundaries. Split into services only when measured load or team size demands it.

```
Browser (PWA)
   │
Next.js (App Router)  ── route handlers / server actions (thin)
   │
Service layer (src/server/services/*)   ← all business rules live here
   │
Repository layer (Drizzle)  ── PostgreSQL + PostGIS
   │
Adapters: SMS, Payments, Storage, Push, Email   (interfaces + provider impls)
   │
Background jobs (queue)  ── expiry, auto-confirm, notifications, reconciliation
```

**Rule:** route handlers parse, authorize, call a service, and format the response. They contain no business logic.

### 3.2 Technology decisions

| Concern | Decision | Notes |
|---|---|---|
| Language | TypeScript (strict) | `noUncheckedIndexedAccess` on |
| Framework | Next.js App Router | Server components for read pages |
| UI | Tailwind + shadcn/ui | Mobile-first, RTL not needed (Bangla is LTR) |
| Auth | Better Auth + `phoneNumber` plugin | OTP logic only; SMS sent via our adapter |
| DB | PostgreSQL 16 + PostGIS | Managed (Neon or Supabase), region near Singapore/Mumbai |
| ORM | Drizzle | SQL migrations committed |
| Validation | Zod | Shared client/server schemas |
| Jobs | pg-boss (Postgres-backed queue) | Avoids a second datastore at first |
| Cache / rate limit | Upstash Redis | Needed for rate limiting and OTP abuse control |
| Storage | Cloudflare R2 (S3 API) | Private bucket for NID and selfies |
| Maps | Leaflet + OpenStreetMap tiles | Check tile usage policy; use a paid tile provider if traffic grows |
| Realtime (phase 2) | Pusher / Ably or Socket.io on a small VPS | Vercel serverless cannot hold sockets |
| i18n | next-intl | `bn` and `en` from day one |
| Testing | Vitest, Testcontainers (Postgres+PostGIS), Playwright | |
| Observability | Sentry, OpenTelemetry logs, PostHog (consented) | |
| CI/CD | GitHub Actions | |
| Hosting | Vercel (app), managed Postgres, Cloudflare (DNS/WAF) | Long-running jobs need a worker process (see 3.3) |
| Package manager | pnpm | Lockfile committed |

### 3.3 Job runner caveat
Vercel functions are short-lived. Run pg-boss workers as a **separate small process** (Railway, Fly.io, or a VPS) using the same codebase (`src/worker.ts`). Vercel Cron can trigger lightweight endpoints, but expiry, auto-confirm, and payment reconciliation should run in the worker.

### 3.4 Environments
| Env | Purpose | Data |
|---|---|---|
| local | Dev with Docker Compose (Postgres+PostGIS, Redis) | Seed data |
| preview | Per-PR deploy | Ephemeral DB branch (Neon branching) |
| staging | Pre-production, mirrors prod | Anonymized data only |
| production | Live | Real |

SMS and payments use sandbox credentials everywhere except production.

---

## 4. Repository Structure

```
simplekaj/
├─ AGENTS.md                    # agent rules (from section 1)
├─ PLAN.md                      # this file
├─ docs/
│  ├─ adr/                      # architecture decision records
│  ├─ runbooks/                 # incident playbooks
│  ├─ api.md                    # generated OpenAPI summary
│  └─ threat-model.md
├─ drizzle/                     # generated SQL migrations
├─ e2e/                         # Playwright tests
├─ scripts/                     # seed, backfill, one-off ops (reviewed, idempotent)
├─ src/
│  ├─ app/
│  │  ├─ [locale]/(public)/     # landing, tasks, login
│  │  ├─ [locale]/(app)/        # post, my-tasks, profile, wallet
│  │  ├─ [locale]/admin/
│  │  └─ api/                   # auth/[...all], tasks, reviews, reports, webhooks
│  ├─ components/               # ui/, task/, map/, forms/
│  ├─ db/
│  │  ├─ schema/                # one file per module
│  │  ├─ client.ts
│  │  └─ seed.ts
│  ├─ lib/
│  │  ├─ auth.ts  auth-client.ts
│  │  ├─ env.ts                 # Zod-validated env, fails fast at boot
│  │  ├─ logger.ts  errors.ts  money.ts  geo.ts  rate-limit.ts
│  ├─ server/
│  │  ├─ services/              # task, ledger, payment, review, report, dispute, verification
│  │  ├─ policies/              # authorization rules (can(user, action, resource))
│  │  ├─ adapters/              # sms/, payments/, storage/, push/
│  │  └─ jobs/                  # expire-tasks, auto-confirm, reconcile, notify
│  ├─ validators/               # Zod schemas shared with the client
│  ├─ messages/                 # en.json, bn.json
│  └─ worker.ts                 # job runner entrypoint
├─ docker-compose.yml
├─ drizzle.config.ts
└─ .github/workflows/
```

Module rule: `app/` may import `server/services`; `services` may import `db` and `adapters`; **never the reverse**. Enforce with an ESLint import-boundaries rule.

---

## 5. Data Model

Conventions: UUID v7 primary keys, `created_at` and `updated_at` on every table, soft delete (`deleted_at`) on user-facing content, all FK indexed, all enums as Postgres enums or check constraints, timestamps are `timestamptz` (UTC).

### 5.1 Tables

```
user                      (Better Auth core + extras)
  id, name, phone (unique, E.164), phone_verified, image,
  role (poster|worker|both|admin|support), locale (bn|en),
  area_id, rating_avg, rating_count, status (active|suspended|banned),
  created_at, updated_at, deleted_at
  (Better Auth also owns: session, account, verification)

zone                      -- launch areas
  id, name_en, name_bn, boundary (geography Polygon), active

worker_profile
  user_id PK/FK, verification_status (none|pending|approved|rejected),
  nid_last4, nid_photo_key, selfie_key, rejected_reason, categories[],
  bio, accepts_home_entry (bool), reviewed_by, reviewed_at

category
  id, slug, name_en, name_bn, icon, min_budget_poisha, requires_verified_worker,
  allowed (bool)

task
  id, poster_id, worker_id NULL, category_id, zone_id,
  title, description,
  budget_poisha, commission_bps (snapshot at creation),
  commission_poisha (computed on confirm),
  address_public_text,           -- coarse, shown in feed (area/landmark)
  address_private_text,          -- exact, revealed after accept
  location_public geography(Point),   -- fuzzed ~300 m for feed
  location_private geography(Point),  -- exact
  deadline_at, status, payment_method (cash|online),
  cancel_reason, version (int, optimistic lock),
  accepted_at, started_at, completed_at, confirmed_at, expired_at

task_event                -- append-only audit of every transition
  id, task_id, actor_id, from_status, to_status, metadata jsonb, at

task_image
  id, task_id, storage_key, kind (brief|proof)

ledger_account            -- one per user + platform accounts
  id, owner_type (user|platform), owner_id, kind (wallet|escrow|commission|payout)

ledger_entry              -- double-entry, append-only
  id, txn_id, account_id, direction (debit|credit), amount_poisha > 0,
  task_id NULL, memo, created_at

ledger_txn
  id, idempotency_key (unique), kind, created_at

payment
  id, task_id, provider (bkash|nagad|sslcommerz|cash), provider_ref (unique),
  amount_poisha, status (initiated|held|released|refunded|failed),
  raw_webhook jsonb, created_at

payout
  id, user_id, amount_poisha, method (bkash|nagad), destination_masked,
  status (requested|processing|paid|failed), provider_ref

review
  id, task_id, reviewer_id, reviewee_id, rating 1..5, comment,
  UNIQUE(task_id, reviewer_id)

report
  id, reporter_id, target_user_id NULL, task_id NULL, reason, details,
  status (open|reviewing|actioned|dismissed), handled_by

dispute
  id, task_id, opened_by, reason, evidence jsonb, status,
  resolution (release|refund|split), split_bps, resolved_by, resolved_at

notification
  id, user_id, type, payload jsonb, channel, sent_at, read_at

audit_log                 -- security-relevant admin and system actions
  id, actor_id, action, target_type, target_id, ip, user_agent, at, diff jsonb

rate_limit_block          -- optional persistent bans
  id, key, reason, until
```

### 5.2 Required indexes and constraints
- `task`: GIST on `location_public`; btree on `(status, zone_id, created_at DESC)`; partial index `WHERE status = 'open'`.
- `task`: `CHECK (budget_poisha >= category.min)` enforced in service; `CHECK (worker_id IS NULL OR worker_id <> poster_id)`.
- `ledger_entry`: constraint that each `ledger_txn` sums to zero (debits = credits), verified by a deferred trigger or a service check plus a nightly audit job.
- `review`: unique `(task_id, reviewer_id)`.
- `payment.provider_ref` unique to make webhooks idempotent.
- Foreign keys use `ON DELETE RESTRICT` for money and audit tables.

### 5.3 Privacy by design
- Feed shows `location_public` (fuzzed) and `address_public_text`. Exact address and phone are returned only to the poster and the accepted worker.
- NID number is **not stored in full**. Keep the photo in a private bucket, store the last 4 digits only, and delete images after a retention period or on account deletion, as legal advice permits.
- Encrypt sensitive columns at the application layer if you ever store more than the above.

---

## 6. Task State Machine

```
OPEN ──accept──▶ ACCEPTED ──start──▶ IN_PROGRESS ──complete──▶ COMPLETED
  │                  │                    │                        │
  │                  └──cancel(worker/poster)──▶ CANCELLED/ OPEN   │
  ├──cancel(poster)──▶ CANCELLED                                   ├──confirm──▶ CONFIRMED ──▶ SETTLED
  └──deadline──▶ EXPIRED                                           ├──auto (24h)──▶ CONFIRMED
                                                                   └──dispute──▶ DISPUTED ──▶ SETTLED
```

### 6.1 Transition table (single source of truth, in code and tests)

| From | To | Actor | Preconditions | Side effects |
|---|---|---|---|---|
| OPEN | ACCEPTED | worker | verified if category requires; no commission debt over limit; not own task; worker not banned; max 2 active tasks | reveal private address; notify poster; set `accepted_at` |
| ACCEPTED | IN_PROGRESS | worker | | notify poster |
| IN_PROGRESS | COMPLETED | worker | proof photo for categories that require it | start 24 h auto-confirm timer |
| COMPLETED | CONFIRMED | poster or system | | compute commission; ledger postings |
| CONFIRMED | SETTLED | system | payment cleared | release escrow; enable reviews |
| OPEN | CANCELLED | poster | | refund any held payment |
| ACCEPTED | OPEN or CANCELLED | worker (releases) or poster (penalty) | | penalty rules in 6.3; ledger as needed |
| OPEN | EXPIRED | system | `deadline_at` passed | notify poster |
| COMPLETED / IN_PROGRESS | DISPUTED | either party | within 48 h | freeze funds, notify admins |

### 6.2 Concurrency rules
- Accept uses a conditional update, and the result is checked:
  ```sql
  UPDATE task
  SET worker_id = $1, status = 'accepted', accepted_at = now(), version = version + 1
  WHERE id = $2 AND status = 'open' AND poster_id <> $1;
  -- rowCount = 0 → respond 409 TASK_NOT_AVAILABLE
  ```
- Every other transition uses `WHERE id = $id AND status = $expected AND version = $v`.
- Every transition writes a `task_event` row **in the same transaction**.
- Property-based tests: random sequences of transitions never reach an illegal state.

### 6.3 Cancellation policy (configurable in DB, not code)
- Poster cancels before accept: free.
- Poster cancels after accept: fee of X% or a flat amount paid to the worker, unless the worker has not started within N minutes.
- Worker abandons after accept: a rating penalty and a strike; 3 strikes lead to suspension review.

---

## 7. Money and Ledger

### 7.1 Principles
1. Integer poisha only. A `Money` helper in `lib/money.ts` handles formatting (Bangla digits optional) and basis-point math with explicit rounding (banker's rounding or floor; decide once and document it).
2. **Double-entry ledger.** Each business event creates one `ledger_txn` with balanced `ledger_entry` rows.
3. **Idempotency.** Every txn has a unique key (for example `task:{id}:confirm`). A retry must not double-post.
4. Balances are derived from entries (a cached balance column is allowed only if reconciled nightly).
5. No update or delete on ledger tables. Corrections are new reversing entries. Enforce with DB permissions or triggers.

### 7.2 Accounts
`user:wallet`, `user:payable`, `platform:escrow`, `platform:commission`, `platform:gateway_clearing`, `platform:cash_commission_receivable`.

### 7.3 Flows

**Cash task (MVP)**
- On confirm: commission is booked as a *receivable* from the worker (`Dr worker:wallet(debt) / Cr platform:commission`).
- If a worker's unpaid commission exceeds the limit (example: 200 BDT), the accept precondition fails until they pay via bKash/Nagad (manual reconciliation at first).

**Online task (phase 2)**
1. Poster pays → webhook verified → `Dr gateway_clearing / Cr platform:escrow` (status `held`).
2. Confirm → `Dr escrow / Cr worker:wallet` (budget minus commission) and `Dr escrow / Cr platform:commission`.
3. Cancel or refund → `Dr escrow / Cr gateway_clearing`, then the provider refund API.
4. Worker payout → `Dr worker:wallet / Cr payout`, with provider payout API or manual with an admin-approved queue.

### 7.4 Payment safety
- Verify webhook signatures; never trust redirect query params alone. Re-query the provider's status API before crediting.
- Store raw webhook payloads. Make handlers idempotent on `provider_ref`.
- Nightly **reconciliation job**: provider settlement report vs. `payment` table vs. ledger. Alert on any mismatch.
- Limit exposure early: cap task budget (example: 5,000 BDT) and daily payout per user until trust builds.

### 7.5 Compliance note
Holding customer funds and paying out can be regulated in Bangladesh (payment service rules, trade license, tax). Get legal and gateway guidance **before** enabling online payments. The cash-first MVP exists partly to defer this.

---

## 8. API Design

### 8.1 Conventions
- REST under `/api/v1`. JSON only. Zod-validated body, query, and params.
- Auth via Better Auth session cookie (`HttpOnly`, `Secure`, `SameSite=Lax`).
- Mutations that create resources accept an `Idempotency-Key` header.
- Cursor pagination (`?cursor=&limit=`) with a max limit of 50. No offset pagination on feeds.
- Timestamps in ISO 8601 UTC. IDs are opaque strings.

### 8.2 Endpoints (v1)

| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET | `/tasks` | optional | Nearby feed (`lat,lng,radius,category,minBudget,maxBudget,cursor`) |
| POST | `/tasks` | user | Create task |
| GET | `/tasks/:id` | optional | Detail (private fields only for poster or worker) |
| PATCH | `/tasks/:id` | poster | Edit while `open` |
| POST | `/tasks/:id/accept` | worker | Accept |
| POST | `/tasks/:id/start` | worker | Start |
| POST | `/tasks/:id/complete` | worker | Complete (+ proof upload key) |
| POST | `/tasks/:id/confirm` | poster | Confirm |
| POST | `/tasks/:id/cancel` | participant | Cancel with reason |
| POST | `/tasks/:id/dispute` | participant | Open dispute |
| POST | `/uploads/sign` | user | Presigned upload (type and size whitelisted) |
| POST | `/reviews` | participant | Review after settle |
| POST | `/reports` | user | Report user or task |
| GET | `/me/tasks` | user | Posted / accepted lists |
| GET | `/me/wallet` | user | Balance and entries |
| POST | `/workers/apply` | user | Verification submit |
| POST | `/webhooks/{provider}` | signature | Payment webhooks |
| * | `/admin/*` | admin | Users, tasks, reports, verifications, disputes |

### 8.3 Error shape
```json
{ "error": { "code": "TASK_NOT_AVAILABLE", "message": "This task was just taken.", "requestId": "..." } }
```
Use stable machine codes: `UNAUTHENTICATED`, `FORBIDDEN`, `VALIDATION_FAILED`, `NOT_FOUND`, `CONFLICT`, `RATE_LIMITED`, `PAYMENT_FAILED`, `INTERNAL`. Never leak stack traces. Every response carries a `requestId` that also appears in logs and Sentry.

### 8.4 Authorization
Centralize in `server/policies`: `can(user, "task:accept", task)`. Write a test matrix for each policy (anonymous, poster, worker, other user, admin, banned).

---

## 9. Authentication and Account Security

- **Better Auth `phoneNumber` plugin** for OTP. Read the current docs for option names before coding.
- `sendOTP` calls the SMS adapter. In dev and test it logs the code and never calls a real gateway.
- OTP rules: 6 digits, 5-minute expiry, max 5 verify attempts, then a lockout with backoff.
- **Abuse controls on OTP send:** per phone (3 per 15 min), per IP, per device fingerprint, a global daily budget cap with an alert, and CAPTCHA (Turnstile) after the first resend.
- Normalize phone numbers to E.164 (+880). Reject non-Bangladeshi numbers in v1 unless intended.
- Sessions: 30-day sliding, revocable, list active sessions in settings, rotate on privilege change.
- Roles: `poster`, `worker`, `both`, `support`, `admin`. Admin routes require role plus (phase 2) a second factor. Admin actions are written to `audit_log`.
- Ban flow: banning revokes sessions immediately.
- Do not use temporary emails visible to users. If the plugin requires an email, generate an internal one, and never display it.

---

## 10. Security Checklist (OWASP-aligned)

| Area | Requirement |
|---|---|
| Transport | HTTPS only, HSTS, TLS via Cloudflare |
| Headers | Strict CSP (nonce-based), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (geolocation only) |
| CSRF | SameSite cookies plus Origin check on mutations |
| Injection | Drizzle parameterized queries only; raw SQL via `sql` template with bound params |
| XSS | React escaping; sanitize any rich text (use plain text for task descriptions); no `dangerouslySetInnerHTML` |
| IDOR | Policy check on every resource fetch; tests for cross-user access |
| Uploads | Presigned URLs, content-type and size whitelist, magic-byte check, strip EXIF GPS, virus scan (ClamAV or provider), private bucket for NID |
| SSRF | No server fetch of user-supplied URLs |
| Rate limiting | Per user, IP, and route class (auth, write, read); stricter for OTP and task posting |
| Secrets | Env-validated at boot, stored in the host secret manager, rotated on schedule |
| Dependencies | Dependabot, `pnpm audit` in CI, lockfile pinned, minimal deps |
| Logging | Redact phone, NID, tokens, and addresses; log IDs instead |
| Admin | IP allowlist optional, audit log, least privilege |
| Content | Banned-category enforcement and keyword screening on task text; report flow |
| Backups | Encrypted, tested restores (see section 14) |

Produce `docs/threat-model.md` (STRIDE per feature) before launch. Run a manual security review and an external pen test of the money and auth paths before enabling online payments.

---

## 11. Frontend Plan

### 11.1 Principles
- Mobile-first, thumb-friendly, one primary action per screen.
- Fast on bad networks: server components, small bundles, image optimization, skeletons, offline shell via service worker.
- Accessibility: WCAG 2.1 AA, visible focus, labels, 44px tap targets, proper contrast.
- Bangla first-class: Bangla font (Noto Sans Bengali, subset and `display: swap`), Bangla numerals optional, test string expansion.

### 11.2 Key screens
| Screen | Notes |
|---|---|
| Landing | Value prop, how it works, categories, "Post a task" and "Earn money" CTAs |
| Login | Phone, OTP, resend timer, clear errors |
| Feed | List and map toggle, filters, distance, pull-to-refresh, realtime "new tasks" banner |
| Task detail | Fuzzed location before accept, "you earn X" for workers, Accept sticky button |
| Post task | 3-step wizard: what, where (map pin), budget and deadline; price guidance per category |
| My tasks | Tabs with status chips, next-action button |
| Active task | Timeline, call/WhatsApp, share live status, report |
| Wallet | Balance, commission due, history |
| Profile | Public reviews, badges, verification status |
| Admin | Dashboard, queues (verifications, reports, disputes), user and task search |

### 11.3 State and data
- Server components and route handlers for reads. TanStack Query for client interactivity. Zod schemas shared with the API. Optimistic UI only where rollback is safe (not for accept).
- Handle every network failure visibly: retry, offline banner, no silent drops.

### 11.4 PWA
Manifest, icons, installable, service worker for the app shell and static assets (not for authenticated API responses). Web push in phase 2.

---

## 12. Notifications

| Event | Channel |
|---|---|
| Task accepted / completed / confirmed | In-app, push (phase 2), SMS fallback for critical |
| New task in my zone (workers who opted in) | Push, optional SMS (cost-capped) |
| Dispute opened / resolved | In-app and SMS |
| Verification approved or rejected | In-app and SMS |

All sends go through a queue job with retries, backoff, a dead-letter queue, and per-user preferences. SMS spend has a hard daily cap.

---

## 13. Testing Strategy

| Level | Tool | Focus |
|---|---|---|
| Unit | Vitest | Money math, policies, state machine, validators |
| Property | fast-check | State machine never reaches an illegal state; ledger always balances |
| Integration | Vitest + Testcontainers | Services against real Postgres+PostGIS: accept race, nearby query, ledger, idempotency |
| Contract | Zod and MSW | SMS and payment adapters against recorded sandbox responses |
| E2E | Playwright (mobile viewport) | Signup → post → accept → complete → confirm → review |
| Security | ESLint security rules, `pnpm audit`, ZAP baseline | CI gate |
| Load | k6 | Feed at 50 rps, accept contention (100 workers on one task, exactly one wins) |
| Accessibility | axe in Playwright | No serious violations |

Coverage target: 90% or more on `services/`, `policies/`, `money`. Do not chase coverage on UI glue.

---

## 14. DevOps, Delivery, and Operations

### 14.1 CI (GitHub Actions, required to merge)
1. Install (frozen lockfile) → typecheck → lint → unit tests
2. Integration tests with Postgres+PostGIS service container
3. Build
4. Migration check (apply to a fresh DB, then to a snapshot)
5. Playwright E2E on the preview deployment
6. Dependency and secret scan

### 14.2 CD
- PR → preview deploy with an isolated DB branch.
- Merge to `main` → staging auto-deploy → smoke tests → manual promote to production.
- Migrations run as a separate step **before** the new code (expand → migrate → contract pattern, so old and new code both work during rollout).
- Feature flags (Vercel Edge Config or PostHog) for risky features such as online payments.
- Rollback: redeploy the previous build; migrations are backward-compatible by rule.

### 14.3 Observability
- Sentry for errors (frontend and backend), with release tracking.
- Structured JSON logs with `requestId`, `userId` (hashed or ID only), and route.
- Metrics and alerts: error rate, p95 latency, OTP send failures, SMS spend, queue depth and oldest job age, webhook failures, ledger imbalance, reconciliation mismatch.
- Uptime monitor on `/api/health` (checks DB and Redis) and on the worker heartbeat.
- Business dashboard: tasks posted, accept time, completion rate, GMV, commission, repeat rate.

### 14.4 Backups and DR
- Managed PITR enabled. Daily logical dump to a separate provider or bucket, encrypted.
- **Restore drill** monthly; record time taken.
- Object storage versioning for NID and proof images.

### 14.5 Runbooks (`docs/runbooks/`)
OTP provider outage (failover to the second provider), payment webhook backlog, ledger mismatch, DB failover, data deletion request, suspected account takeover, safety incident escalation.

### 14.6 Cost guardrails
SMS daily cap with alerts, Upstash and DB usage alerts, a budget alert on the cloud account.

---

## 15. Legal, Privacy, and Trust

- Terms of Service, Privacy Policy, Community Guidelines, and a Refund and Cancellation Policy (Bangla and English) before launch. Have a lawyer review them.
- Review Bangladesh's data protection requirements and any applicable trade license, tax, and payment-service rules; get local counsel for the commission, worker-classification, and money-holding questions.
- Explicit consent at signup for data use; separate consent for analytics and marketing.
- Data subject requests: export and delete flows. Retention schedule for NID images, chat, and logs.
- Prohibited tasks list enforced in the UI, in keyword checks, and by admin review. Include alcohol, drugs, unlicensed medicine, weapons, adult services, anything illegal or unsafe.
- Worker safety: safety tips page, "share my task" link to a trusted contact, one-tap report, an emergency number prompt.
- Minors: require age 18 or more at signup (declaration plus verification for workers).

---

## 16. Delivery Plan with Acceptance Criteria

Each milestone ends with a deployed, demoable build on staging.

### M0: Foundation (week 1)
- Repo, TypeScript strict, ESLint, import boundaries, Prettier, Husky, CI, Docker Compose
- `env.ts` validation, logger, error classes, request ID middleware
- Drizzle, PostGIS enabled, migration workflow, seed script
- **Accept:** `pnpm dev` works from a clean clone in under 5 minutes; CI green on an empty feature.

### M1: Auth (week 1-2)
- Better Auth with phone OTP, SMS adapter (sandbox and dev logger), rate limits, Turnstile
- Profile and role selection, session management
- **Accept:** signup, login, and logout work end to end; OTP abuse tests pass; sessions revocable.

### M2: Tasks core (week 2-3)
- Task schema, categories, zones, create/edit/cancel, image upload, fuzzed location
- PostGIS feed with filters and cursor pagination
- **Accept:** feed p95 under 400 ms on 50k seeded tasks; private fields never leak (tested).

### M3: Lifecycle (week 3-4)
- State machine, accept race safety, start/complete/confirm, auto-confirm and expiry jobs, `task_event` log
- My Tasks, active task screen, call/WhatsApp links
- **Accept:** 100-way concurrent accept test yields exactly one winner; property tests pass.

### M4: Trust and money-lite (week 4-5)
- Reviews, reports, ledger (double-entry), cash commission receivable, wallet screen, accept gate on debt
- **Accept:** ledger always balances (nightly audit job green); idempotent retries verified.

### M5: Admin and hardening (week 5-6)
- Admin panel, audit log, ban flow, notification queue, i18n (bn and en), PWA
- Security review, load test, a11y pass, threat model, runbooks, legal pages
- **Accept:** all section 10 items checked; restore drill done; Lighthouse mobile 90 or more (performance and accessibility).

### M6: Closed beta (week 6-8)
- 20-50 users in one zone, Sentry and analytics live, feedback loop
- **Exit:** no sev-1 bugs for a week; accept time median under 15 minutes with seeded supply.

### M7: Public launch in zone (week 8-10)
- Feature flags, support process, status page, marketing assets

### M8: Phase 2 (week 10-16)
- Worker verification (NID and selfie, admin queue)
- Online payments with escrow and reconciliation (gated by legal clearance)
- In-app chat and push notifications, dispute flow
- **Accept:** pen test on auth and payments completed, findings fixed.

(Double these durations if you work solo and part-time.)

---

## 17. Agent Task Backlog (first slices, in order)

Each item is one PR.

0. `chore: skills setup` install and vet the starter skills, create the custom skills, write `docs/skills.md` (section 21). Nothing else starts until this is done.
1. `chore: scaffold` Next.js, TypeScript strict, Tailwind, shadcn, ESLint, Vitest, pnpm, CI.
2. `chore: docker-compose` Postgres+PostGIS, Redis; `env.ts` validation.
3. `feat(db): base schema` user, zone, category, task, task_event, plus migrations and seed.
4. `feat(auth): better-auth phone otp` adapter, dev logger, rate limit, tests.
5. `feat(lib): money + geo + errors + logger` with unit tests.
6. `feat(tasks): create and read` service, policy, API, form, image upload, location fuzzing.
7. `feat(tasks): nearby feed` PostGIS query, filters, cursor pagination, integration tests.
8. `feat(tasks): state machine` transition table, optimistic locking, `task_event`, property tests.
9. `feat(tasks): accept/start/complete/confirm` endpoints, UI, concurrency test.
10. `feat(jobs): pg-boss worker` expiry and auto-confirm.
11. `feat(ledger): double-entry` accounts, txn, entries, idempotency, nightly audit job.
12. `feat(reviews/reports)`.
13. `feat(admin)` queues, ban, audit log.
14. `feat(i18n+pwa)`.
15. `chore(security)` headers, CSP, pen-test prep, threat model.

Start every slice by reading this file's relevant section, and end it by ticking the Definition of Done in section 1.2.

**Process reminder:** do one task, stop, post the completion report from section 1.0.1 (with owner reminders and a suggested next task), and wait for the owner's go-ahead. Update `docs/PROGRESS.md` every time.

---

## 18. Open Decisions (owner must answer; agent must not guess)

| # | Decision | Default if unanswered |
|---|---|---|
| 1 | Launch zone | One campus or neighborhood, to be named |
| 2 | Commission rate | 10% (0% for the first month) |
| 3 | Cancellation penalties | Per 6.3, values TBD |
| 4 | Max task budget in v1 | 5,000 BDT |
| 5 | SMS provider (primary and fallback) | Local gateway primary, second as failover |
| 6 | Payment providers and merchant account status | Cash only until approved |
| 7 | Legal entity and trade license | Required before online payments |
| 8 | Data residency / hosting region | Closest managed region with PostGIS |
| 9 | Chat: build vs. call/WhatsApp only | Call/WhatsApp in v1 |
| 10 | Worker verification required for which categories | Home-entry and high-value |

---

## 19. Risks

| Risk | Mitigation |
|---|---|
| Empty marketplace | Single zone, recruit workers first, seed tasks |
| OTP/SMS cost abuse | Rate limits, CAPTCHA, spend cap and alerts |
| Off-platform deals | Low fees, hide contacts until accept, value from ratings and payments |
| Safety incident | Verification, restrictions, reports, fast admin response, runbook |
| Double-booking or ledger bugs | State machine, DB-level guards, property and concurrency tests, nightly audits |
| Payment or regulatory blockers | Cash-first MVP, early legal and gateway conversations |
| Solo-ops burnout | Managed services, strong alerts, small scope, runbooks |
| Vendor lock-in | Adapters for SMS, payments, storage; standard Postgres |

---

## 20. Glossary

- **Poster:** user who creates a task. **Worker:** user who completes it.
- **Poisha:** 1/100 BDT, the integer unit for all money.
- **Escrow:** funds held by the platform until the task is confirmed.
- **Fuzzed location:** deliberately approximate coordinates shown before acceptance.
- **ADR:** architecture decision record (short doc of a decision and why).

---

## 21. Skills Plan

Skills are instruction packages (`SKILL.md` plus optional references and scripts) that the agent reads before working. Rule: **no work without a skill** (section 1.0.2).

### 21.1 Recommended starting set (install at project level)

| Skill | Use for | Source |
|---|---|---|
| `better-auth-best-practices` | Better Auth setup, adapters, migrations, plugins | `better-auth/skills` |
| `vercel-react-best-practices` | React and Next.js performance | `vercel-labs/agent-skills` |
| `vercel-composition-patterns` | Component structure as the UI grows | `vercel-labs/agent-skills` |
| `web-design-guidelines` | UI, accessibility, and UX audits | `vercel-labs/agent-skills` |
| `frontend-design` | Distinctive, non-generic UI | `anthropics/skills` |
| `supabase-postgres-best-practices` | Postgres schema, indexes, queries (applies to Neon too) | `supabase/agent-skills` |
| `playwright-skill` | Reliable E2E tests | `testdino-hq/playwright-skill` |
| `skill-creator` | Creating the project's own skills | `anthropics/skills` |

```bash
# Run from the repo root. First confirm exact names with: npx skills add <repo> --list
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices --skill web-design-guidelines --skill vercel-composition-patterns -a claude-code -y
npx skills add anthropics/skills --skill frontend-design --skill skill-creator -a claude-code -y
npx skills add https://github.com/better-auth/skills --skill best-practices -a claude-code -y
npx skills add supabase/agent-skills --skill supabase-postgres-best-practices -a claude-code -y
npx skills add testdino-hq/playwright-skill --skill playwright-skill -a claude-code -y
```

Do not install: Stripe skills (we use bKash, Nagad, and SSLCommerz), Prisma skills (we use Drizzle), or large "everything" bundles. Search for a Drizzle skill with `npx skills find drizzle` and vet it before use.

### 21.2 Project custom skills (create with `skill-creator`, commit to the repo)

| Skill | Must encode |
|---|---|
| `simplekaj-task-state-machine` | Section 6 transition table, optimistic locking, `task_event` writes, concurrency tests |
| `simplekaj-ledger-and-money` | Integer poisha, double-entry postings, idempotency keys, webhook and reconciliation safety |
| `simplekaj-privacy-and-authz` | Fuzzed locations, hidden phone and address, policy checks, log redaction, upload safety |
| `simplekaj-task-workflow` | One-task-at-a-time rule, completion report template, `docs/PROGRESS.md` updates, next-task selection |
| `simplekaj-bangladesh-integrations` | SMS gateway, bKash/Nagad/SSLCommerz adapter contracts (written from official docs once accounts exist) |

Each custom skill: short `SKILL.md` (aim under 200 lines), a clear "when to use" description, links to the relevant plan sections and official docs, and a checklist the agent can verify at the end.

### 21.3 Skill safety and hygiene
- Skills are executable influence on the agent. Read every `SKILL.md` and script before installing; skills.sh popularity is not proof of safety.
- Prefer official and vendor-maintained sources. Pin by committing the installed files; review diffs when updating.
- Never install skills globally for this project; keep them in the repo so the team and CI see the same set.
- Keep the active set small (target 8 to 15). Remove skills that overlap or go unused.
- Skills never override the plan's hard invariants (section 1.3). If they conflict, the plan wins and the agent flags it.
- Add `docs/skills.md` listing each installed skill, its source URL, the date added, and who reviewed it.
- Backlog addition: **Task 0** is "install and vet the starter skills, create the custom skills, write `docs/skills.md`", done before Task 1.
