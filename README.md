# AI Alpha Build Log

AI Alpha Build Log is a blog-first full-stack product built to make one argument fast. I know how to turn AI Alpha workflows into real leverage across product design, frontend systems, backend implementation, and technical writing. This repo exists to show that edge in working software, not just talk about it.

This is more persuasive than a normal portfolio repo because it behaves like a real product. It includes a polished public surface, a structured MDX publishing workflow, validated forms, protected admin views, persistence, metadata, and tests. The value is that speed, taste, and implementation quality show up in the same place.

For recruiters, it signals range across interface design, system building, explanation, and delivery polish. For freelance clients, it shows the kind of work that is easiest to buy with confidence: technically solid, visually intentional, and built around real business flows. The point is not that I can claim productivity gains from AI Alpha, but that I can make them visible in shipped work.

## Why this stands out

- It shows AI Alpha workflow leverage through real shipping work, not prompt theater
- It treats the blog as a serious full-stack product: content system, auth, admin tools, forms, persistence, metadata, and testing
- It makes frontend taste, backend judgment, and implementation discipline visible in one repo
- It gives recruiters and freelance clients concrete proof of what I can build, not just claims about productivity
- It packages speed and taste together, which is the combination that actually wins client work

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

## Production on `ai.kevin-mok.com`

This server already has Nginx-backed upstreams on ports `3000` through `3003`, so this app should run on `127.0.0.1:3004`. The included server script defaults to that port and fails fast if the selected port is already in use.

1. Copy the environment file and point the site URL at the production hostname:

```bash
cp .env.example .env.local
```

Required production values:

- `NEXT_PUBLIC_SITE_URL=https://ai.kevin-mok.com`
- `DATABASE_URL=...`
- `NEXT_PUBLIC_SUPABASE_URL=...`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
- `SUPABASE_SERVICE_ROLE_KEY=...`
- `ADMIN_EMAIL=...`
- `ADMIN_FULL_NAME=...`
- `AI_BLOG_DEMO_MODE=0`
- `E2E_BYPASS_AUTH=0`

2. Prepare the production build:

```bash
pnpm server:prepare
```

3. Start the app behind Nginx:

```bash
pnpm server:start
```

If you want one command for an initial bring-up, use:

```bash
pnpm server:run
```

The underlying script lives at `scripts/ai-blog-server.sh` and supports `ENV_FILE`, `HOST`, and `PORT` overrides. The default startup target is `127.0.0.1:3004`.

Example Nginx upstream for `ai.kevin-mok.com`:

```nginx
server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name ai.kevin-mok.com;

  location / {
    proxy_pass http://127.0.0.1:3004;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 60s;
  }
}
```

If you run this under `systemd`, point `ExecStart` at:

```bash
/usr/bin/env bash /home/kevin/ai-blog/scripts/ai-blog-server.sh start
```

## Auth notes

- Admin access uses Supabase magic-link sign-in.
- Authorization is enforced server-side by looking up the authenticated email in the `Profile` table and requiring the `ADMIN` role.
- The seed step upserts the Prisma `Profile` record for `ADMIN_EMAIL`.
- If you want the magic-link request to target an existing auth user only, create the matching Supabase Auth user ahead of time and change the login action to disable auto-creation.
- Detailed setup steps for this repo live in [`docs/supabase-setup.md`](docs/supabase-setup.md).

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
pnpm start
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm server:prepare
pnpm server:start
pnpm server:run
```

## Content workflow

- Add published or draft articles to `content/posts/*.mdx`
- Supply the required frontmatter fields from the prompt spec
- Keep images local under `public/`
- Draft posts stay out of public routes, RSS, tag pages, and sitemap output
