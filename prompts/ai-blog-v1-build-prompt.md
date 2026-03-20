# AI Blog V1 Build Prompt

You are a senior full-stack engineer building a production-style AI blog in this repository.

## Objective

Build an AI-native technical blog that is strong enough to show to freelance clients and full-stack web recruiter screens. The app should feel modern and intentional, not generic SaaS. It should emphasize:

- AI-native developer workflows
- technical writing and long-form content
- polished frontend taste
- real full-stack features instead of a static brochure

## Existing Repo State

- This repo is currently greenfield.
- Existing files such as `post-ideas.md` and `plans/formalize-ai-alpha-blog-ideas.md` must be preserved.
- Do not rewrite or remove unrelated existing files.

## Required Stack

Use exactly this core stack:

- Next.js
- TypeScript
- Supabase
- Postgres
- Prisma
- Tailwind CSS

Use:

- Next.js App Router
- Server Components by default
- Client Components only where interactivity requires them
- Server Actions for form submissions unless a real route handler is clearly justified
- Vercel-compatible deployment defaults

## Product Shape

Build AI Blog v1 with these core surfaces:

- Homepage
- Blog index page
- Individual article page
- Tag pages
- About page
- Contact page
- Protected admin page for subscribers
- Protected admin page for contact inquiries

This is a blog-first product, not a multi-author newsroom and not a generic SaaS starter.

## Content Model

The writing workflow must be Markdown-first.

- Store posts in `content/posts/*.mdx`
- Use typed frontmatter validation
- Keep posts version-controlled in the repo
- Do not build a full CMS for v1
- Use a server-side MDX content pipeline

Required frontmatter fields:

- `title`
- `slug`
- `excerpt`
- `publishedAt`
- `updatedAt` optional
- `tags`
- `featured`
- `draft`
- `seoTitle` optional
- `seoDescription` optional
- `coverImage` optional

Public blog routes must exclude draft posts.

## Data Model

Use Supabase Postgres as the single database. Do not add MongoDB.

Use Prisma only on the server for application data access.

Initial Prisma models should cover:

- `Profile`
  - `id`
  - `email`
  - `fullName`
  - `role`
  - `createdAt`
- `Subscriber`
  - `id`
  - `email`
  - `status`
  - `source`
  - `createdAt`
- `ContactInquiry`
  - `id`
  - `name`
  - `email`
  - `company` optional
  - `budgetRange` optional
  - `message`
  - `status`
  - `createdAt`

Use a seeded admin profile tied to Supabase Auth.

## Auth

Use Supabase Auth for admin-only authentication.

- No public user accounts in v1
- Support admin login via magic link or email OTP
- Protect admin routes server-side
- Authorize admin access via role checks, not only session presence

## Forms And Dynamic Features

Implement:

- newsletter/subscriber capture stored in Postgres
- contact inquiry form stored in Postgres
- clear success, validation, loading, and error states
- duplicate subscriber handling

Do not add email campaign sending in v1. Capture-only is enough.

## Design Direction

The design should follow a blend of two frontend skill philosophies:

- `design-taste-frontend` as the primary direction
- `minimalist-ui` as the restraint layer

Translate that into this visual language:

- restrained terminal / CLI aesthetic
- modern, minimal, and technical
- mono-forward accents and panel framing
- subtle cyan or blue accent only
- article pages optimized for calm long-form reading
- homepage can be more expressive than article pages
- avoid generic AI SaaS visuals, loud gradients, purple glow, and over-decorated dashboards

The site should feel closer to an intentional coding workspace than a startup landing page template.

## Implementation Requirements

Build these behaviors and artifacts:

- typed content loader for MDX posts
- homepage with featured and latest posts
- blog index with tags and filtering
- article page with strong typography and table of contents for long posts
- tag landing pages
- about page with positioning for clients and recruiters
- contact page
- protected admin pages for subscribers and inquiries
- metadata for all pages
- sitemap
- robots.txt
- RSS feed
- Open Graph image support

Keep images local and version-controlled for v1 rather than building media uploads.

## Quality Bar

The implementation must look and behave production-ready:

- accessible markup
- responsive layout
- fast initial load
- clean empty states
- clear form validation
- polished error states
- no drive-by refactors
- no unrelated file churn

## Environment And Tooling

Set up scripts for:

- dev
- build
- lint
- typecheck
- test
- test:e2e

Use a pragmatic test mix:

- unit/integration coverage for content utilities and form logic
- end-to-end coverage for core flows

## Acceptance Criteria

The build is only done when:

- published MDX posts render correctly
- draft posts are hidden from public routes
- subscriber form writes to Postgres and handles duplicates
- contact form writes to Postgres and validates inputs
- admin login works
- non-admin users cannot access admin pages
- homepage, blog index, article pages, and tag pages render correctly
- build, lint, typecheck, unit tests, and e2e tests pass

## Working Rules

- Read the repo before writing
- Keep diffs focused and reversible
- Do not touch unrelated existing files
- Preserve `post-ideas.md`
- Update docs as part of the same change
- Prefer small commits if asked to commit

## Final Deliverable

Implement the app in this repo and finish with:

- concise change summary
- exact verification commands run
- any environment variables required
- any remaining follow-up items
