## ExecPlan: Supabase Setup Documentation

### Objective

Document the exact Supabase setup flow for this repo so deployment users can obtain the required env vars, configure magic-link auth correctly, seed the admin profile, and verify the production login flow.

### Assumptions

1. This app uses Supabase for authentication and uses Prisma with `DATABASE_URL` for Postgres persistence.
2. The main user confusion is the difference between Supabase auth keys and the Postgres connection string.
3. The right source of truth for current dashboard locations and auth redirect behavior is the official Supabase documentation.

### Plan

- Map the repo's actual Supabase and database usage from local code.
- Add a dedicated setup document with env mapping, dashboard steps, auth URL configuration, and verification commands.
- Link the document from the main README so it is easy to discover during server setup.

### Verification

- Review the generated doc against local code references for env var names and redirect paths.
- Check the linked official Supabase docs for API keys, connection strings, redirect URLs, and passwordless auth behavior.

### Review

- Completed.
- Added [`docs/supabase-setup.md`](../docs/supabase-setup.md) with repo-specific Supabase setup instructions covering env var mapping, dashboard steps, auth URL configuration, seeding, startup, and troubleshooting.
- Linked the new setup doc from [`README.md`](../README.md) so it is visible during deployment work.
- Aligned the guidance with local code paths for `signInWithOtp()`, cookie-based auth, Prisma seeding, and the required `DATABASE_URL`.
- Verified the official Supabase docs for API keys, connection strings, redirect URLs, passwordless magic-link behavior, and `signInWithOtp()` usage.
