# AI Blog V1

AI Blog is a blog-first Next.js application built to demonstrate technical writing, AI-native workflow design, and real full-stack implementation details instead of a static brochure. The current UI ships with a restrained CLI-inspired dark theme that keeps public and admin routes visually aligned.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- Supabase Auth
- Postgres
- MDX content loaded from `content/posts/*.mdx`

## Features

- Homepage, archive, article pages, tag pages, about, and contact
- Cohesive CLI-inspired dark workspace UI across public and admin routes
- Typed MDX frontmatter validation and draft exclusion
- Newsletter capture and contact inquiry forms via Server Actions
- Prisma-backed subscriber and inquiry storage
- Supabase-authenticated admin routes with role checks
- Dynamic sitemap, robots, RSS feed, and Open Graph image routes
- Vitest coverage for the content pipeline and validation rules
- Playwright coverage for the public flows and protected admin views in demo mode

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy the environment template and fill in the live credentials:

```bash
cp .env.example .env.local
```

3. Provide the required values:

- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL`
- `ADMIN_FULL_NAME`

4. Generate the Prisma client and apply the schema to your Postgres database:

```bash
pnpm prisma:generate
pnpm db:push
pnpm prisma:seed
```

5. Start the dev server:

```bash
pnpm dev
```

## Auth notes

- Admin access uses Supabase magic-link sign-in.
- Authorization is enforced server-side by looking up the authenticated email in the `Profile` table and requiring the `ADMIN` role.
- The seed step upserts the Prisma `Profile` record for `ADMIN_EMAIL`.
- If you want the magic-link request to target an existing auth user only, create the matching Supabase Auth user ahead of time and change the login action to disable auto-creation.

## Demo mode

Set `AI_BLOG_DEMO_MODE=1` to preview the app without a live Postgres connection. In demo mode:

- subscriber and inquiry writes use an in-memory store
- admin routes still require auth unless `E2E_BYPASS_AUTH=1`
- Playwright uses demo mode plus auth bypass to exercise the full UI flow locally

Do not use demo mode in production.

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
```

## Content workflow

- Add published or draft articles to `content/posts/*.mdx`
- Supply the required frontmatter fields from the prompt spec
- Keep images local under `public/`
- Draft posts stay out of public routes, RSS, tag pages, and sitemap output
