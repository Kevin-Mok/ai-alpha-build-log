## ExecPlan: Codex Playwright Skill Post

### Objective

Publish a readable article about the curated Codex Playwright skill, using the local copy under `/home/kevin/linux-config/dot_agents/skills/playwright` as the concrete source of truth and syncing the editorial backlog to match.

### Assumptions

1. The local skill mirrors the curated Playwright skill in OpenAI's official skills repository.
2. The article should focus on the skill packaging and workflow design, not on generic Playwright testing advice.
3. The published post should stay grounded in the repo's existing practical, opinionated voice.

### Plan

- Rewrite the published MDX post so it centers the Codex Playwright skill, its wrapper, snapshot loop, sessions, and guardrails.
- Update the related `post-ideas.md` entry to reflect the final published angle.
- Record the user correction in `tasks/lessons.md`.
- Verify that the content pipeline still passes after the rewrite.

### Verification

- `pnpm test`
- `rg -n "Codex|playwright-cli|snapshot|wrapper" content/posts/playwright-browser-loop-ai-web-development.mdx`

### Review

- Completed.
- Reframed the published article around the curated Codex Playwright skill rather than generic Playwright usage.
- Grounded the article in the local skill copy at `/home/kevin/linux-config/dot_agents/skills/playwright` and the curated upstream layout.
- Updated `post-ideas.md` to reflect the final published angle.
- Added `tasks/lessons.md` to capture the user correction about anchoring posts to specific local artifacts when named.
- Verified `pnpm test` passes after the rewrite.
