## ExecPlan: CLI dark theme redesign

### Objective

Redesign the existing AI Blog app into a restrained CLI-inspired interface while preserving all existing routes, content behavior, server actions, and admin functionality.

### Assumptions

1. The redesign should stay within the current Next.js App Router and Tailwind CSS stack without adding new dependencies.
2. Existing route structure, MDX rendering, data flows, and admin protections must remain intact; only presentation and layout treatment should change.
3. The theme should apply consistently to public and admin screens, with article readability taking priority over novelty.

### Plan

- Replace the current light-first design tokens with a dark graphite CLI palette, monospace-first typography, and quieter texture treatments.
- Update shared primitives such as buttons, chips, panels, empty states, and shell chrome to reflect command-bar, editor-pane, and log-viewer patterns.
- Rework public route layouts for a docked workspace feel while keeping the existing content hierarchy and navigation paths intact.
- Restyle article pages and MDX content for readable long-form monospace presentation with editor-like framing and a file-outline table of contents.
- Restyle admin login and admin dashboards into operator-console views, then run the project verification suite and record results.

### Verification

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

### Review

- Completed.
- Replaced the original light editorial palette with a dark graphite CLI system using monospace-first typography, tighter radii, layered panel surfaces, and restrained cyan accents.
- Restyled shared primitives including navigation, footer, buttons, chips, empty states, forms, post cards, admin shell chrome, and MDX rendering to read like workspace panels rather than marketing cards.
- Reworked the homepage, archive, article, tag, about, contact, admin login, admin queue, and 404 routes so they preserve behavior while matching the command-bar and document-pane visual direction.
- Updated `README.md` to reflect the shipped CLI dark theme.
- Verified with `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm exec playwright test --workers=1`.
- `pnpm test:e2e` inside the sandbox timed out because the parallel Playwright run competed with `next dev`; the serial elevated Playwright run passed all three end-to-end checks.
