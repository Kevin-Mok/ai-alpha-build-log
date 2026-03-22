# AI Alpha Blog Ideas

## Editorial Focus

AI Alpha Blog should sit at the intersection of:

- AI-native developer workflows
- agent tooling and skills
- practical infrastructure choices
- signal-over-hype industry analysis
- distribution systems for technical creators

The strongest posts in this backlog all answer the same question: "What gives builders unfair leverage with AI right now?"

## Recommended Draft Queue

1. `Skills Are the Missing Layer in AI Coding`
2. `Lower Input, Better Output`
3. `Good Taste Is a Competitive Advantage in AI Coding`
4. `MongoDB vs Supabase for AI Apps`
5. `What the 81k Claude Interviews Actually Tell Us`

## Idea Inbox

- [ ] font creator from handwriting idea

## Formalized Ideas

### 1. Skills Are the Missing Layer in AI Coding

- Angle: Most people focus on models and prompts, but reusable skills are the real leverage layer for AI agents.
- Thesis: A good skill turns vague prompting into repeatable operational behavior, which is what separates demos from real output.
- Audience: AI builders, coding-agent power users, indie hackers.
- Why it matters: This can anchor the blog's point of view and connect to several later posts.
- Outline:
  1. Why raw prompting does not scale
  2. What a "skill" actually is
  3. Examples: feedback skill, design taste skill, CI/debugging skill
  4. How skills change the economics of agent use
  5. A simple framework for deciding which skill to build next

### 2. Lower Input, Better Output

- Angle: Prompt bloat feels sophisticated, but high-performing workflows usually compress instructions and externalize reusable behavior.
- Thesis: The best AI systems reduce the amount of fresh context required per task and push stable guidance into skills, tools, and memory.
- Audience: Anyone building repeatable AI workflows.
- Why it matters: This is a clear contrarian take with a strong practical payoff.
- Outline:
  1. The hidden cost of long prompts
  2. Input/output ratio as a workflow metric
  3. What should live in a prompt vs a skill vs a tool
  4. How to trim context without losing quality
  5. Before/after examples from coding workflows

### 12. The Curated Codex Playwright Skill Turns Browser Work Into a Repeatable Loop

- Angle: Focus on the curated Codex Playwright skill itself rather than the underlying library, and show how the skill packages browser automation into a repeatable agent workflow.
- Thesis: The leverage is not "use Playwright"; it is encoding prerequisite checks, wrapper usage, snapshots, sessions, and artifact capture into a reusable skill that Codex can execute reliably.
- Audience: AI coding-tool users, frontend engineers, and developers trying to make browser debugging more operational.
- Why it matters: This article sharpens the blog's core argument that skills are the real leverage layer in AI-assisted development.
- Status: Published on `2026-03-20` at `/blog/playwright-browser-loop-ai-web-development`.
- Outline:
  1. Why the skill matters more than the generic "use Playwright" advice
  2. What the wrapper, snapshot loop, and guardrails actually encode
  3. Why CLI-first browser control fits debugging and learning better than jumping to test files
  4. How sessions, traces, console, and network inspection make the skill useful in practice
  5. Why reusable skills beat larger prompts for browser work
- Note: Source file is `content/posts/playwright-browser-loop-ai-web-development.mdx`.

### 3. Good Taste Is a Competitive Advantage in AI Coding

- Angle: Most AI-generated products fail because they are technically functional but visually generic and poorly judged.
- Thesis: Taste is not decoration; it is a filtering layer that keeps AI output from collapsing into commodity slop.
- Audience: Frontend engineers, product-minded builders, design-conscious founders.
- Why it matters: This gives AI Alpha a differentiated voice beyond pure engineering.
- Outline:
  1. Why AI defaults look generic
  2. What "taste" means in an AI-assisted workflow
  3. Lessons from `taste-skill` and design-oriented agent setups
  4. How to encode taste into systems instead of relying on vibes
  5. A checklist for evaluating AI-generated UI work

### 4. Garry Tan's `gstack` and the Rise of the AI-Native Software Org Chart

- Angle: `gstack` is not just a repo; it is a model of how founders want AI to cover CEO, PM, design, engineering, QA, and docs.
- Thesis: The important trend is not "more agents," but the packaging of organizational roles into reusable AI workflows.
- Audience: Startup founders, technical operators, AI tooling watchers.
- Why it matters: It gives the blog a timely analysis piece tied to a recognizable artifact.
- Outline:
  1. What `gstack` is trying to do
  2. Why role-based AI tooling is appealing
  3. Where these setups create real leverage
  4. Where they break in practice
  5. What this means for small technical teams

### 5. Build a Feedback Skill Before You Add Another Agent

- Angle: Teams often add more agents when the real missing component is higher-quality critique and iteration.
- Thesis: The fastest path to better outputs is often a reusable review loop, not another specialized generator.
- Audience: Developers already using coding agents or prompt chains.
- Why it matters: Practical, specific, and likely to perform well with technical readers.
- Outline:
  1. The "more agents" trap
  2. What a feedback skill should inspect
  3. How to separate generation from critique
  4. Examples of useful review rubrics
  5. Metrics to track after adding a feedback layer

### 6. MongoDB vs Supabase for AI Apps

- Angle: This comparison should focus on AI product workflows rather than generic database benchmarking.
- Thesis: The right choice depends less on brand preference and more on your application's retrieval patterns, auth needs, and operational tolerance.
- Audience: Builders choosing a backend for an AI product.
- Why it matters: High search intent and directly useful.
- Outline:
  1. The actual backend needs of AI apps
  2. Where MongoDB fits well
  3. Where Supabase fits well
  4. Tradeoffs: schema flexibility, auth, realtime, vectors, ops
  5. Decision matrix for common AI app patterns
- Note: This one needs concrete implementation examples before drafting.

### 7. Microsoft and OpenAI: What Builders Should Learn From the Power Balance

- Angle: Instead of generic corporate commentary, frame this as a platform-risk and distribution-risk lesson for builders.
- Thesis: The Microsoft/OpenAI relationship matters because it shows how dependent ecosystems form around model access, cloud distribution, and enterprise trust.
- Audience: AI founders, dev tool builders, technical strategists.
- Why it matters: Strong opinion piece if tied back to product decisions.
- Outline:
  1. Why this relationship matters beyond headlines
  2. The difference between model risk and platform risk
  3. Lessons for teams building on a single provider
  4. How to preserve optionality without slowing down
  5. What to watch over the next year
- Note: This one needs timely research before publishing.

### 8. What the 81k Claude Interviews Actually Tell Us About AI Demand

- Angle: Use Anthropic's large user-response dataset as a lens into what people want, fear, and misunderstand about AI.
- Thesis: The most useful takeaway is not a single trend, but the gap between frontier-lab narratives and lived user behavior.
- Audience: AI builders, researchers, product strategists.
- Why it matters: This can be a high-signal analysis post grounded in a real source.
- Outline:
  1. What the study is and is not
  2. The top demand patterns worth paying attention to
  3. The main fear patterns
  4. What product builders should infer from both
  5. Where public AI discourse still misses the mark

### 9. The AI Content Trough: What Gitea Spam Repos Reveal

- Angle: Start from the observation that low-effort AI content systems leak traces into public code hosting and publishing infrastructure.
- Thesis: Watching the spam layer is useful because it shows where AI content economics break first.
- Audience: Technical marketers, AI skeptics, builders who care about content quality.
- Why it matters: This is a distinctive concept if framed carefully.
- Outline:
  1. What "AI spam infrastructure" looks like in practice
  2. Why public repos are a useful signal source
  3. What these systems optimize for
  4. Why most AI content fails to compound trust
  5. What a non-spam AI content system should do differently
- Note: This needs examples and careful sourcing.

### 10. The Dark Minimal Terminal as a Performance Tool

- Angle: A terminal theme is not just aesthetic if it changes attention, scanning speed, and fatigue in long AI-assisted sessions.
- Thesis: Interface tone affects workflow quality, especially when an engineer is managing multiple AI conversations, logs, and edits.
- Audience: Developers who spend most of their time in terminal-driven workflows.
- Why it matters: This adds some breadth and makes the blog feel more like a founder/operator notebook.
- Outline:
  1. Why environment design matters for deep work
  2. What makes a terminal theme "AI-workflow friendly"
  3. Typography, contrast, density, and window management
  4. Example setup choices
  5. How to tune for comfort without losing readability

### 11. Turn One Blog Post Into a Twitter/LinkedIn Content Pack

- Angle: Show how to design a repeatable prompt or workflow that repurposes one core idea across channels without sounding duplicated.
- Thesis: Distribution works better when it is systematized as a content pack, not improvised after the post is already finished.
- Audience: Technical creators, indie hackers, founder-writers.
- Why it matters: Practical distribution content can widen the blog's audience.
- Outline:
  1. Why most repurposing outputs feel dead on arrival
  2. The structure of a good content pack
  3. Channel-specific transforms for X and LinkedIn
  4. How to preserve voice across formats
  5. A reusable workflow template

### 13. `Superpowers` Shows What Happens When AI Coding Becomes Workflow Product

- Angle: Use `obra/superpowers` as a concrete example of the shift from better prompts toward packaged development methodology for coding agents.
- Thesis: The real leverage in AI coding is increasingly encoded in enforced workflow, with skills, plans, worktrees, subagents, TDD, and review acting as installable operating discipline.
- Audience: AI coding-tool users, engineering leads testing agents, and indie hackers trying to standardize agent output.
- Why it matters: This extends the blog's skills thesis with a high-signal repo that turns process into product.
- Example to include: the brainstorming skill can tell the agent to offer a browser-based visual companion with mockups, diagrams, and comparisons when that would explain a design problem better than plain terminal text.
- Example to include: [`docs/superpowers/specs/2026-03-21-fix-handwriting-u-design.md`](docs/superpowers/specs/2026-03-21-fix-handwriting-u-design.md) as a concrete superpowers plan/spec that shows how a narrow design fix gets scoped with goals, non-goals, verification, and acceptance criteria.
- Outline:
  1. What `superpowers` actually installs and automates
  2. Why opinionated workflow beats ad hoc prompting
  3. Concrete examples of skills encoding behavior, such as the brainstorming skill's browser-offer flow for visual collaboration
  4. The significance of planning, worktrees, subagents, TDD, and review in one system
  5. Where this creates leverage for solo builders and small teams
  6. Where heavy methodology could add drag or ceremony
- Note: Source repo is `https://github.com/obra/superpowers`.

### 14. `commit-session` Solves One of AI Coding's Messiest Git Problems

- Angle: Most AI coding demos stop at code generation, but the real trust boundary is shipping only the work the current agent session actually owns.
- Thesis: Session-scoped commit workflows matter because they turn “don’t accidentally commit someone else’s dirty files” from a vague caution into enforceable operational behavior.
- Audience: AI coding-tool users, developers working in dirty repos, and teams trying to let agents operate safely in shared codebases.
- Why it matters: This is a concrete, high-pain workflow problem that makes the broader “skills over prompts” argument tangible.
- Example to include: capturing a pre-write `git status --short` baseline so later commit logic can separate pre-existing dirty work from files dirtied during the current session.
- Example to include: the `observed_touch` fallback, where directly attributed files can still ship safely even if the session missed its original baseline capture.
- Outline:
  1. Why AI-assisted commits become dangerous in already-dirty worktrees
  2. Why `git add .` destroys trust once humans and agents share a repo
  3. How baseline capture and session scoping create a safer commit boundary
  4. Why explicit workflow policy beats relying on memory or manual diff review
  5. How `commit-session` fits into a larger stack of plans, review, and agent guardrails
  6. The real limits: mixed files, generated artifacts, missing baselines, and ambiguous ownership
- Note: Source skill is `/home/kevin/linux-config/dot_agents/skills/commit-session/SKILL.md`, with supporting plan/history in `/home/kevin/linux-config/plans/commit-session*.md`.

### 15. Codex's Experimental Automatic Approval Review Makes Agent Risk Legible

- Angle: The interesting feature is not just that an agent can ask to do something risky, but that it can generate a structured approval rationale explaining why the action should or should not be allowed.
- Thesis: Coding agents become more trustworthy when dangerous operations are filtered through explicit risk analysis that accounts for destination, reversibility, user intent, and collaborator impact.
- Audience: AI coding-tool users, devtool builders, engineering leads evaluating agent safety, and anyone thinking about permission systems for autonomous tooling.
- Why it matters: This turns an abstract “AI safety” topic into a practical product pattern for day-to-day developer workflows.
- Example to include: an automatic approval review marking a `--force-with-lease` push to `main` as medium risk because it matches the user's requested GitHub workflow but still rewrites published history and can disrupt collaborators.
- Example to include: the review explicitly lowering exfiltration concern because the destination remote and repo contents align with the user-initiated workflow, while still calling out that force-pushing a primary branch is materially harder to reverse than a normal push.
- Outline:
  1. Why binary permission prompts are too blunt for serious agent workflows
  2. What automatic approval review is actually evaluating
  3. Why git pushes and force-pushes are a useful stress test for agent permissions
  4. How contextual risk scoring beats generic “are you sure?” gating
  5. What this means for higher-trust autonomous coding loops
  6. The failure modes: false confidence, bad policy defaults, and unclear accountability
- Note: Source example is the experimental Codex automatic approval review text about approving a `--force-with-lease` push to `main` with medium risk.

## Packaging Notes

- Core positioning posts: 1, 2, 3, 5
- Search/utility posts: 6, 11
- Timely analysis posts: 4, 7, 8, 9
- Lifestyle/operator post: 10
- Workflow/debugging posts: 12, 13, 14, 15

The fastest way to build momentum is to publish one positioning post, one utility post, and one timely analysis post in the first batch.

## Raw Source Notes

Captured notes preserved below for reference:

```text
Pistol (Freelance Dev) pistolfist.eth
 — Yesterday at 12:39
gitea spam ai blog
Pistol (Freelance Dev) pistolfist.eth
 — Yesterday at 12:40
skills
Pistol (Freelance Dev) pistolfist.eth
 — Yesterday at 16:04
Microsoft openai
Pistol (Freelance Dev) pistolfist.eth
 — Yesterday at 16:59
gstack Use Garry Tan's (y combinator ceo) exact Claude Code setup: 15 opinionated tools that serve as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA https://github.com/garrytan/gstack
GitHub
GitHub - garrytan/gstack: Use Garry Tan's exact Claude Code setup: ...
Use Garry Tan's exact Claude Code setup: 15 opinionated tools that serve as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA - garrytan/gstack
Use Garry Tan's exact Claude Code setup: 15 opinionated tools that serve as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA - garrytan/gstack
Pistol (Freelance Dev) pistolfist.eth
 — 01:03
feedback skill
Pistol (Freelance Dev) pistolfist.eth
 — 01:18
mongodb
supabase
dark minimal terminal theme
content pack/prompt for Twitter/LinkedIn
Pistol (Freelance Dev) pistolfist.eth
 — 07:26
https://x.com/i/status/2034302152945144166
SaucyBot
APP
 — 07:26

Anthropic (@AnthropicAI)
We invited Claude users to share how they use AI, what they dream it could make possible, and what they fear it might do.

Nearly 81,000 people responded in one week—the largest qualitative study of its kind.

Read more: https://anthropic.com/features/81k-interviews
Replies
249
Retweets
693
Likes
4897
Views
1416128

Twitter•Yesterday at 12:13
Pistol (Freelance Dev) pistolfist.eth
 — 07:36
https://github.com/Leonxlnx/taste-skill
GitHub
GitHub - Leonxlnx/taste-skill: Taste-Skill (High-Agency Frontend) -...
Taste-Skill (High-Agency Frontend) - gives your AI good taste. stops the AI from generating boring, generic, "slop" - Leonxlnx/taste-skill
Taste-Skill (High-Agency Frontend) - gives your AI good taste. stops the AI from generating boring, generic, "slop"  - Leonxlnx/taste-skill
Pistol (Freelance Dev) pistolfist.eth
 — 10:54
lower input/output ratio
```
