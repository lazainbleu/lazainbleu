<div align="center">

# **Lazain Bleu — E-Commerce Front End** 🕯️💙  
Luxury. Minimal. High-Performance.

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.14-skyblue?logo=tailwind-css)
![pnpm](https://img.shields.io/badge/pnpm-8.0-purple?logo=pnpm)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.19.3-violet?logo=framer)

---

### A premium e-commerce front end built for **Lazain Bleu**,  
designed with elegance, motion precision, and seamless product browsing.

---

## 🌐 Live Preview  
👉 lazainbleu.com *(example — update with your actual domain)*

---

</div>

## 🧩 Tech Stack

| Category        | Tools & Libraries                                                                 |
|-----------------|------------------------------------------------------------------------------------|
| Framework       | **Next.js** — App Router, Server Components, Static Rendering                     |
| Language        | **TypeScript**                                                                    |
| Styling         | **TailwindCSS** with custom tokens, design system, and utility layers             |
| Animations      | **Framer Motion** — luxury motion, micro-interactions, smooth page transitions     |
| Icons           | Lucide React · Tabler Icons                                                       |
| Utilities       | `clsx`, `tailwind-merge`, `react-wrap-balancer`                                   |
| SEO & Theme     | Next Themes · Next SEO · Next Sitemap                                             |

**Development Stack**
- Strict Linting: ESLint (`eslint-config-next`)
- Post-processing: PostCSS + Autoprefixer
- Optional Tailwind plugins for product grids & responsive layout

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/zeiynz/lazainbleu.git
cd lazainbleu

# Install dependencies
pnpm install

# Start development server
pnpm dev

---

## 🏗️ Architecture

Lazain Bleu follows a **Modular Domain Architecture** — a hub-and-spoke system where business domains (`modules/`) are self-contained verticals, and everything else is a domain-agnostic horizontal layer they pull from. This is not a linear pipeline; `modules` is the only layer permitted to reach across multiple horizontal layers at once.

### Core Principles

- Domain-driven decomposition over technical-layer grouping
- Enforced boundaries (lint-blocked, not just documented)
- Explicit module-to-module communication contract
- Minimal global state — server data stays on the server
- Type-safety co-located with domain ownership
- Server-first rendering (RSC + Server Actions by default)
- Infrastructure isolated from business logic
- `lib/` contains pure functions only — zero I/O, zero domain knowledge

---

### Project Structure

```txt
src
│
├── app                          # Routing & composition ONLY — zero business logic
│   │
│   ├── (public)
│   │   ├── page.tsx
│   │   ├── fragrances
│   │   ├── collections
│   │   ├── discovery
│   │   ├── journal
│   │   ├── boutiques
│   │   ├── about
│   │   └── contact
│   │
│   ├── (account)
│   │   ├── profile
│   │   ├── orders
│   │   ├── wishlist
│   │   └── settings
│   │
│   ├── (admin)                   # ← SEPARATE route group, separate layout, separate auth gate
│   │   ├── layout.tsx             # wraps EVERY admin route in role-check (middleware backs this up)
│   │   ├── dashboard
│   │   ├── products               # CRUD UI for modules/fragrance + modules/collection
│   │   ├── orders                 # CRUD UI for modules/order — fulfillment, status updates
│   │   ├── customers              # read/manage modules/customer
│   │   ├── discounts              # vouchers/promo — own module, see below
│   │   ├── content                 # journal posts, boutique listings (CMS-style)
│   │   ├── analytics               # dashboards consuming services/analytics
│   │   └── settings                # store config, shipping zones, payment settings
│   │
│   ├── (legal)
│   ├── api
│   │
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
│
├── modules                      # ← BUSINESS DOMAINS (the hub — vertical slices)
│   │
│   ├── fragrance
│   │   ├── components/          # domain-private UI (e.g. fragrance-card)
│   │   ├── services/            # domain data-fetching / mutations (e.g. products.ts lives HERE now)
│   │   ├── store/                # domain-scoped Zustand slice (if needed)
│   │   ├── types.ts              # domain types live HERE, not globally
│   │   └── index.ts              # PUBLIC API — only this is importable by others
│   │   # NOTE: fragrance/services exposes BOTH read (storefront) and write (admin CRUD)
│   │   # functions through the SAME index.ts — see "Admin Access Pattern" below
│   │
│   ├── collection
│   ├── discovery
│   ├── cart                      # services/cart-service.ts ← was lib/cartData.ts
│   ├── checkout                  # imports modules/cart & modules/customer
│   │                              # ONLY via their index.ts — see Module Contract below
│   ├── customer
│   ├── order
│   ├── wishlist
│   ├── journal
│   ├── boutique
│   ├── discount                  # vouchers/promo codes — used by checkout AND admin
│   └── admin                     # admin-ONLY concerns: roles, permissions, audit log
│       ├── components/            # AdminTable, AdminSidebar, BulkActionBar — admin-UI-specific
│       ├── services/              # role-check helpers, audit-log writer
│       ├── types.ts                # AdminRole, Permission, AuditEntry
│       └── index.ts
│
├── components                   # Domain-AGNOSTIC, reusable, zero business knowledge
│   │
│   ├── ui                       # Button, Modal, Skeleton, Input
│   ├── layout                   # Header, Footer, Shell
│   ├── navigation
│   ├── forms                    # generic form primitives, not domain forms
│   └── feedback                 # Toast, ErrorBoundary, EmptyState
│
├── services                      # Cross-cutting, NOT domain-owned
│   │
│   ├── analytics
│   ├── search                    # search-client.ts ← was lib/search.ts
│   ├── seo
│   └── tracking
│
├── infrastructure                # How the app talks to the outside world
│   │
│   ├── auth                      # auth.ts + auth-client.ts ← were lib/auth.ts, lib/auth-client.ts
│   ├── database                  # Drizzle client, schema, migrations
│   ├── email                     # Resend client
│   ├── storage
│   ├── analytics
│   └── cache
│
├── config                        # env validation (Zod), site config, feature flags
│
├── lib                           # PURE FUNCTIONS ONLY — see full breakdown below
│   ├── format/
│   ├── validation/
│   ├── string/
│   ├── array/
│   ├── number/
│   └── cn.ts
│
├── store                         # GLOBAL Zustand only (Theme, UI shell state) — see State section
├── types                         # ONLY types shared by 3+ modules (e.g. ApiResponse<T>)
├── styles
├── tests
│
├── middleware.ts                 # thin: auth/redirect checks ONLY, no business logic
└── instrumentation.ts             # OpenTelemetry / observability hooks
```

---

### Technology Stack

```txt
Framework      → Next.js 15.3.4 (App Router, Server Components, Static Rendering)
Language       → TypeScript 5.6 (strict mode)
Database       → PostgreSQL
ORM            → Drizzle ORM
Authentication → Better Auth
State          → Zustand (minimal, see State Management below)
Validation     → Zod
Email          → Resend
Styling        → Tailwind CSS 3.4.14 — custom tokens, design system, utility layers
Animation      → Framer Motion 12.19.3 — luxury motion, micro-interactions
Icons          → Lucide React · Tabler Icons
Utilities      → clsx · tailwind-merge · react-wrap-balancer
SEO & Theme    → Next Themes · Next SEO · Next Sitemap
Analytics      → Vercel Analytics
Deployment     → Vercel
Package Mgr    → pnpm 8.0
```

---

### Dependency Flow — Hub & Spoke, Not a Pipeline

A linear diagram (`app → modules → components → services → infrastructure`) is the wrong mental model for DDD: it implies modules depend on components depend on services, which contradicts "components must not import modules." The correct shape is **modules as the hub**, reaching out to flat horizontal layers — none of which know about each other or about modules.

```txt
                      ┌─────────────┐
                      │     app     │  (composition only)
                      └──────┬──────┘
                             │ imports
                             ▼
                      ┌─────────────┐
                      │   modules   │  ◄── the ONLY vertical layer
                      └──────┬──────┘
              ┌──────────────┼──────────────┬───────────────┐
              ▼              ▼              ▼               ▼
        ┌──────────┐  ┌────────────┐  ┌──────────────┐  ┌────────┐
        │components│  │  services  │  │infrastructure│  │  libs  │
        └──────────┘  └────────────┘  └──────────────┘  └────────┘
        (horizontal — none of these import each other or `modules`)
```

**Enforced rules:**

| # | Rule | Rationale |
|---|---|---|
| 1 | ✅ `app` may import `modules` | Composition root |
| 2 | ✅ `modules` may import `components`, `services`, `infrastructure`, `libs`, `config` | Modules are the only cross-cutting consumer |
| 3 | ✅ `modules/X` may import `modules/Y` **only via `Y/index.ts`** | Explicit public API, never internal files — see Module Contract |
| 4 | ❌ `components` must NOT import `modules` | Keeps components domain-agnostic and reusable |
| 5 | ❌ `infrastructure` must NOT import `app` | Infra has no knowledge of routing/UI |
| 6 | ❌ `libs` must NOT depend on `modules` | Pure functions stay pure, zero circular risk |
| 7 | ❌ `services` must NOT import `modules` | Cross-cutting concerns stay generic |

These are not aspirational — see **Enforcement** below for the lint config that blocks violations at commit/CI time.

---

### Module Contract (Module-to-Module Communication)

With 10 domains, some inevitably need each other — `checkout` needs `cart` and `customer`; `order` needs `checkout`. Undefined cross-module access reintroduces N×N coupling, which defeats the purpose of modularizing in the first place. This project uses **explicit public APIs**, not orchestration-only:

1. Every module exposes a single `index.ts` barrel file. This is its **entire public surface**.
2. Internal files (`components/`, `services/`, `store/`, `types.ts`) inside a module are **never imported directly** from outside that module.
3. Cross-module imports are **whitelisted explicitly** per module, not "anything goes":

```txt
modules/checkout  → may import from: modules/cart, modules/customer, modules/order
modules/order     → may import from: modules/customer
modules/wishlist  → may import from: modules/fragrance
modules/discovery → may import from: modules/fragrance, modules/collection
```

Any cross-module dependency not listed above is a violation — add it to this table explicitly before writing the import, so coupling stays visible and intentional rather than accumulating silently.

---

### Admin Panel Architecture

Admin is **not** "another page in the storefront" — it has a different audience (staff, not customers), different auth requirements (role-based, not session-only), and different access patterns (write/mutate, not just read). Treating it as an afterthought is how admin routes end up accidentally accessible to logged-in customers, or admin-only mutation logic leaking into storefront components.

#### 1. Route isolation — `(admin)` is its own route group

```txt
app/(admin)/
├── layout.tsx        # checks role BEFORE rendering anything inside — see auth gate below
├── dashboard/
├── products/
├── orders/
├── customers/
├── discounts/
├── content/
├── analytics/
└── settings/
```

This is the same pattern as `(public)` and `(account)` — a route group gets its own `layout.tsx`, which means its own nav shell, its own auth boundary, and zero shared layout chrome with the storefront. Customers should never see an admin sidebar even by accident; isolating the route group makes that structurally impossible, not just a matter of conditionally hiding a nav item.

#### 2. Auth gate — two layers, not one

A single check is a single point of failure. This architecture enforces role-based access **twice**, at different layers, so a bug in one doesn't expose the other:

```txt
Layer 1 — middleware.ts
  → runs on EVERY request to /​(admin)/*
  → checks session exists + role is staff/admin
  → redirects to /login if not, BEFORE any admin code executes

Layer 2 — app/(admin)/layout.tsx
  → re-checks role server-side (defense in depth — never trust middleware alone)
  → renders the admin shell only if both checks pass
```

```ts
// middleware.ts — excerpt, business-logic-free as required by the rules above
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = await getSession(request);          // infrastructure/auth
    if (!session || !isStaffRole(session.user.role)) {  // modules/admin (role check helper)
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}
```

The middleware calls into `modules/admin`'s role-check helper rather than reimplementing role logic inline — role definitions live in exactly one place (`modules/admin/types.ts` for the `AdminRole` enum, `modules/admin/services/` for the check function), never duplicated between middleware and layout.

#### 3. Admin Access Pattern — reusing modules, not duplicating them

The temptation with admin panels is to build a parallel set of data-fetching functions (`getProductsForAdmin()`, `getProductsForStorefront()`) that drift apart over time. Instead, **modules expose both read and write operations through the same `index.ts`**, and admin simply calls the write functions the storefront never needs:

```txt
modules/fragrance/index.ts exports:
  ├── getFragranceBySlug()      ← used by storefront (app/(public)/fragrances)
  ├── listFragrances()           ← used by BOTH storefront and admin (different filters)
  ├── createFragrance()          ← admin ONLY — but lives in the same module, same file
  ├── updateFragrance()          ← admin ONLY
  └── deleteFragrance()          ← admin ONLY
```

The module doesn't know or care who's calling it — **authorization happens at the call site** (the admin route checked the role via middleware before this code ever runs), not inside the module itself. This keeps `modules/fragrance` focused purely on "what can be done to a fragrance," while `modules/admin` and the auth layers own "who is allowed to do it."

#### 4. Admin-specific module — what actually belongs in `modules/admin`

`modules/admin` is intentionally thin. It does **not** contain product/order/customer logic — that stays in their own modules per the pattern above. It only owns concerns that are exclusively about *being an admin*:

```txt
modules/admin/
├── components/
│   ├── AdminTable.tsx          # generic data table w/ sort, filter, bulk-select
│   ├── AdminSidebar.tsx
│   ├── BulkActionBar.tsx
│   └── RoleBadge.tsx
├── services/
│   ├── role-service.ts         # isStaffRole(), hasPermission(role, action)
│   └── audit-service.ts        # logAdminAction() — who changed what, when
├── types.ts                    # AdminRole = 'super_admin' | 'staff' | 'fulfillment'
│                                  Permission = 'products:write' | 'orders:fulfill' | ...
└── index.ts
```

**Module Contract addition** for admin (extends the table from earlier):

```txt
modules/admin → may import from: modules/fragrance, modules/collection, modules/order,
                                   modules/customer, modules/discount, modules/journal,
                                   modules/boutique
                (admin is allowed to reach into every domain it manages — but every
                 OTHER module must NOT import modules/admin. Admin is a consumer of
                 modules, never a dependency of them.)
```

That last rule matters: if `modules/cart` ever imported something from `modules/admin`, it would mean storefront code depends on admin-only logic — a sign the boundary has already broken down.

#### 5. Audit logging — non-negotiable for an e-commerce admin

Every mutating admin action (price change, order status override, discount creation) should write an audit entry. This isn't optional polish — when (not if) a customer disputes a refund or a price discrepancy, "who changed this and when" needs to be answerable in seconds, not reconstructed from memory.

```ts
// modules/admin/services/audit-service.ts
export async function logAdminAction(entry: {
  adminId: string;
  action: string;        // 'product.price_updated'
  targetId: string;      // the fragrance/order/customer ID affected
  before: unknown;
  after: unknown;
}) {
  // writes to infrastructure/database — admin module is allowed to call infra directly,
  // same as any other module
}
```



### `lib/` — The Most Commonly Misused Folder

`lib/` is where most projects quietly turn into a junk drawer (`utils.ts` with 40 unrelated functions, auth wrappers, data fetchers — all dumped together because "it's not a component"). To prevent this, `lib/` has the **narrowest definition in the entire architecture**:

> **A file belongs in `lib/` only if it is a pure function: same input always produces the same output, zero side effects, zero awareness of "cart", "user", "auth", or any business concept.**

**The 3-question test before creating any file in `lib/`:**

1. Does it `await fetch()`, query the database, or call an external SDK (Resend, Better Auth, Drizzle, a search API)? → **Not `lib/`.** It's `infrastructure/` (generic plumbing) or `modules/X/services/` (domain-specific).
2. Does it know about a specific business concept (cart, fragrance, checkout, voucher, order)? → **Not `lib/`.** It belongs inside that module.
3. Is it pure input → output, with no side effects and no domain knowledge? → **Only then, `lib/`.**

#### What actually goes in `lib/`

```txt
src/lib/
│
├── format/
│   ├── currency.ts          # formatIDR(15000) → "Rp 15.000"
│   ├── date.ts              # formatRelativeDate(), formatOrderDate()
│   └── slug.ts              # slugify("Eau de Lazain") → "eau-de-lazain"
│
├── validation/
│   ├── schemas/              # Zod schemas — generic SHAPE only, no DB calls inside
│   │   ├── email.ts
│   │   ├── phone-id.ts       # Indonesia-specific phone number format
│   │   └── postal-code.ts
│   └── rules.ts              # isValidSKU(), isValidVoucherFormat()
│
├── string/
│   ├── truncate.ts
│   └── capitalize.ts
│
├── array/
│   ├── chunk.ts
│   └── group-by.ts
│
├── number/
│   ├── clamp.ts
│   └── round-to-nearest.ts
│
└── cn.ts                      # clsx + tailwind-merge wrapper — the canonical lib file
```

#### Where your current `lib/` files actually belong

This is the direct fix for the files currently sitting in `src/lib/` in the project:

| Current file | Why it's in the wrong place | Correct home |
|---|---|---|
| `auth.ts` | Wraps Better Auth server config — talks to sessions/cookies/DB | `infrastructure/auth/server.ts` |
| `auth-client.ts` | Wraps Better Auth client SDK — browser-side auth state | `infrastructure/auth/client.ts` |
| `cartData.ts` | Fetches/mutates cart — domain logic, not a pure function | `modules/cart/services/cart-service.ts` |
| `products.ts` | Fetches product data from DB/API — domain logic | `modules/fragrance/services/fragrance-service.ts` |
| `search.ts` | Cross-cutting but hits a search index/API — has a side effect | `services/search/search-client.ts` |
| `validation.ts` | **Split it**: generic Zod shapes stay, domain-specific schemas move | Generic → `lib/validation/schemas/`; domain-specific (`checkoutSchema`, `cartItemSchema`) → inside their respective module's `types.ts` or a `schemas.ts` next to it |
| `utils.ts` | Classic junk-drawer — usually 5+ unrelated functions with no shared theme | Split by category into `lib/format/`, `lib/string/`, `lib/array/`, `lib/number/` as shown above |

**Why this split matters at scale:** when `lib/` only contains pure functions, it can be unit-tested trivially (no mocks needed), safely imported from *anywhere* including Server Components, Client Components, and even a future React Native app — without ever risking a circular import back into `modules/`. The moment a single `await` or `db.query` slips into `lib/`, that guarantee breaks silently.

---

### Enforcement (Not Just Documentation)

Rules without tooling are suggestions. This project enforces the dependency flow, the module contract, and the `lib/` purity rule via `eslint-plugin-boundaries`, blocking violations at lint-time and in CI — not relying on code review memory.

```js
// eslint.config.js
import boundaries from 'eslint-plugin-boundaries';

export default [
  {
    plugins: { boundaries },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'modules', pattern: 'src/modules/*', capture: ['module'] },
        { type: 'components', pattern: 'src/components/**' },
        { type: 'services', pattern: 'src/services/**' },
        { type: 'infrastructure', pattern: 'src/infrastructure/**' },
        { type: 'libs', pattern: 'src/lib/**' },
      ],
    },
    rules: {
      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          { from: 'app', allow: ['modules', 'components', 'libs', 'config'] },
          { from: 'modules', allow: ['components', 'services', 'infrastructure', 'libs', 'config'] },
          { from: 'components', allow: ['components', 'libs'] },        // never 'modules'
          { from: 'services', allow: ['infrastructure', 'libs'] },      // never 'modules'
          { from: 'infrastructure', allow: ['infrastructure', 'libs'] }, // never 'app'
          { from: 'libs', allow: ['libs'] },                            // never 'modules' — enforces purity
        ],
      }],
      // Forces cross-module imports through index.ts only — blocks deep imports
      // e.g. disallows reaching into `modules/checkout/services/payment.ts` from outside the module
      'boundaries/entry-point': ['error', {
        default: 'disallow',
        rules: [
          { target: 'modules', allow: 'index.ts' },
        ],
      }],
      // Optional but recommended: block imports of fetch/db clients inside src/lib/**
      // via eslint-plugin-import's no-restricted-imports, scoped to lib/ only.
    },
  },
];
```

Runs in pre-commit (Husky) and CI. A PR that violates the dependency flow, reaches past a module's `index.ts`, or puts a side-effecting function into `lib/` fails before merge — not after a refactor six months later finds it.

---

### State Management

Global state is intentionally minimal and explicitly scoped — most state should be server-derived (RSC/Server Actions) or domain-local (inside a module's own `store/`), never global by default.

```txt
Global (src/store/) — UI shell concerns ONLY
├── Theme
└── UI State (modals, drawers, nav)

Domain-scoped (modules/X/store/) — owned by the module
├── modules/cart/store        → cart contents, totals
└── modules/wishlist/store    → saved items
```

Cart and wishlist are **not** global precisely because they're domain state — keeping them inside their module means deleting or refactoring `modules/cart` doesn't ripple into an unrelated global store.

---

### Scalability Goals

This architecture is designed to absorb the following without requiring structural rewrites — only new modules or whitelist entries in the Module Contract table:

- Multi-country commerce
- Loyalty program
- Fragrance finder quiz
- Subscription products
- Wholesale portal
- Retail boutique integration
- Mobile applications (shared `modules/` + `infrastructure/` consumed by a future RN/Expo client)
- International fulfillment
- Multi-staff admin with granular permissions (super_admin vs fulfillment-only vs content-only roles, via `modules/admin`'s `Permission` type — no architectural change needed, only new enum values)

Each new capability becomes a new entry in `modules/`, consuming existing `infrastructure/` and `components/` — it does not require touching the dependency flow or lint config.

---

### Engineering Standards

- TypeScript Strict Mode
- ESLint + Prettier + `eslint-plugin-boundaries` (architecture enforcement, not just style)
- Husky + Commitlint (Conventional Commits)
- Modular Domain Architecture with enforced module contract
- `lib/` purity enforced — pure functions only, verified by lint rule
- Server-First Rendering (RSC + Server Actions over client fetching)
- Accessibility First
- SEO Optimized
- Performance Focused

---

### Migration Checklist (Current → Target)

Don't big-bang this. Move one category at a time, run the app after each step, commit separately:

- [ ] Move `lib/auth.ts`, `lib/auth-client.ts` → `infrastructure/auth/`
- [ ] Move `lib/cartData.ts` → `modules/cart/services/cart-service.ts`, create `modules/cart/index.ts`
- [ ] Move `lib/products.ts` → `modules/fragrance/services/fragrance-service.ts`, create `modules/fragrance/index.ts`
- [ ] Move `lib/search.ts` → `services/search/search-client.ts`
- [ ] Split `lib/validation.ts` → generic schemas stay in `lib/validation/`, domain schemas move into their module
- [ ] Split `lib/utils.ts` → `lib/format/`, `lib/string/`, `lib/array/`, `lib/number/`
- [ ] Repeat the same component-domain audit for everything currently under `src/components/cart`, `src/components/product`, etc. — domain-specific UI moves into `modules/X/components/`, only truly generic UI stays in `src/components/`
- [ ] Create `app/(admin)/` route group with its own `layout.tsx` — do NOT bolt admin pages onto `(account)` even temporarily
- [ ] Create `modules/admin/` — `role-service.ts`, `audit-service.ts`, `types.ts` (AdminRole, Permission) first, before any admin UI
- [ ] Add the role-check block to `middleware.ts` for the `/admin` path — verify it redirects correctly BEFORE building any admin pages behind it
- [ ] Add `createX/updateX/deleteX` functions to existing modules' `index.ts` (fragrance, order, customer, discount) rather than creating parallel "admin-only" data-fetching files
- [ ] Wire `logAdminAction()` into every mutating admin action from day one — retrofitting audit logs after admin already has real usage is far more painful
- [ ] Install and configure `eslint-plugin-boundaries`, run it once across the whole repo to surface every existing violation before enforcing it in CI
- [ ] Fill in the Module Contract table for real, based on actual imports found during migration — including the `modules/admin → many modules, but never the reverse` rule
