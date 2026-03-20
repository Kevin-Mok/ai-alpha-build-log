# Supabase Setup

This app uses Supabase for admin authentication and uses Postgres through Prisma for data persistence.

That split matters:

- `NEXT_PUBLIC_SUPABASE_URL` is your Supabase project URL for auth client setup.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is the public client key used by the Supabase auth client.
- `SUPABASE_SERVICE_ROLE_KEY` is a server-only key. Keep it in `.env.local` and never expose it to the browser.
- `DATABASE_URL` is the Postgres connection string Prisma uses for `Profile`, `Subscriber`, and `ContactInquiry`.

If `DATABASE_URL` is blank, the app will not start in live mode even if the Supabase auth keys are present.

## What This Repo Uses Supabase For

- Admin login uses Supabase magic links via `signInWithOtp()`.
- Admin route protection reads the authenticated Supabase user from cookies and maps that email to a Prisma `Profile` row with the `ADMIN` role.
- The app database is still Postgres via Prisma. Supabase is not replacing `DATABASE_URL` here.

Local code references:

- [`lib/actions/auth.ts`](../lib/actions/auth.ts)
- [`lib/supabase/server.ts`](../lib/supabase/server.ts)
- [`prisma/seed.ts`](../prisma/seed.ts)
- [`.env.example`](../.env.example)

## 1. Create A Supabase Project

1. Create a new project in the Supabase dashboard.
2. Save the database password you choose. You will need it for `DATABASE_URL`.
3. Wait for the project to finish provisioning before copying keys or connection strings.

## 2. Copy The Values Into `.env.local`

Create the file if needed:

```bash
cp .env.example .env.local
```

Then fill these values:

```env
NEXT_PUBLIC_SITE_URL=https://ai.kevin-mok.com

NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

DATABASE_URL="postgresql://..."

ADMIN_EMAIL=you@example.com
ADMIN_FULL_NAME="Kevin Mok"

AI_BLOG_DEMO_MODE=0
E2E_BYPASS_AUTH=0
```

### Where Each Value Comes From

- `NEXT_PUBLIC_SUPABASE_URL`
  Get this from the project Connect dialog or project settings. It is the base project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  Copy the low-privilege public key used by the client. This repo currently names the env var after the legacy `anon` key, so the simplest setup is to use the legacy `anon` key from the API Keys section.
- `SUPABASE_SERVICE_ROLE_KEY`
  Copy the legacy `service_role` key and keep it server-only.
- `DATABASE_URL`
  Copy the Postgres connection string from the Connect dialog.

## 3. Pick The Right `DATABASE_URL`

For this repo, `DATABASE_URL` should be a real Postgres connection string that Prisma can use.

Supabase's docs say direct connections are ideal for persistent servers such as VMs, but direct connections use IPv6 by default. If your environment cannot use the direct connection cleanly, use a pooler connection from the same Connect dialog instead.

Practical recommendation for this VPS:

- Try the direct connection string first.
- If that fails due network or IP version issues, use a session pooler connection from the Connect dialog.

Example shape:

```env
DATABASE_URL="postgresql://postgres:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres?sslmode=require"
```

## 4. Configure Supabase Auth URLs

This repo sends magic links to:

- `https://ai.kevin-mok.com/admin/subscribers` in production
- `http://localhost:3000/admin/subscribers` in local development

In the Supabase dashboard URL configuration:

- Set Site URL to `https://ai.kevin-mok.com`
- Add Redirect URLs:
  - `https://ai.kevin-mok.com/admin/subscribers`
  - `http://localhost:3000/admin/subscribers`

Use the exact production path. Supabase recommends exact redirect URLs in production rather than broad wildcards.

## 5. Seed The Admin Profile

This app only grants admin access if the authenticated email also exists in the Prisma `Profile` table with the `ADMIN` role.

That is what `ADMIN_EMAIL` and `pnpm prisma:seed` are for.

Run:

```bash
pnpm server:prepare
```

That will:

- install dependencies
- generate Prisma client
- push the schema
- seed the admin profile using `ADMIN_EMAIL`
- build the production app

Important detail:

- The current auth flow uses `shouldCreateUser: true`, so the first magic-link sign-in can create the Supabase Auth user automatically.
- You still need the seeded Prisma `Profile` row or the app will reject admin access.

## 6. Start And Verify

Start the app:

```bash
pnpm server:start
```

Then verify:

```bash
curl -I http://127.0.0.1:3004
curl -I https://ai.kevin-mok.com
```

Manual login check:

1. Open `https://ai.kevin-mok.com/admin/login`
2. Enter the same email you put in `ADMIN_EMAIL`
3. Open the magic link email on the same device
4. Confirm you land on `/admin/subscribers`

## Troubleshooting

### `Missing required env var: DATABASE_URL`

Your `.env.local` still has a blank or invalid `DATABASE_URL`. This is the most common setup miss.

### `Supabase auth is not configured yet`

You are missing `NEXT_PUBLIC_SUPABASE_URL` and/or `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### Magic link email sends, but login fails

Check both of these:

- Site URL is `https://ai.kevin-mok.com`
- Redirect URL `https://ai.kevin-mok.com/admin/subscribers` is allowlisted

### `That email is not authorized for admin access.`

The email you used in the login form does not match the seeded `ADMIN_EMAIL`, or the seed step was not run successfully.

### The site returns `502`

Nginx is up, but the app is not listening on `127.0.0.1:3004`. Fix `.env.local`, run `pnpm server:prepare`, then run `pnpm server:start`.

## Official References

- API keys: https://supabase.com/docs/guides/api/api-keys
- Postgres connection strings: https://supabase.com/docs/reference/postgres/connection-strings
- Redirect URLs: https://supabase.com/docs/guides/auth/redirect-urls
- Passwordless magic links: https://supabase.com/docs/guides/auth/auth-email-passwordless
- `signInWithOtp()` reference: https://supabase.com/docs/reference/javascript/auth-signinwithotp
