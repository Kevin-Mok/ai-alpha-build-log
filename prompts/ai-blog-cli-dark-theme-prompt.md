# AI Blog CLI Dark Theme Prompt

You are a senior frontend engineer redesigning the existing AI Blog app in this repository.

Use these skills as design constraints:

- `design-taste-frontend` as the primary direction
- `minimalist-ui` as the restraint layer
- `redesign-existing-projects` if available, because this is an upgrade of an existing app rather than a greenfield mockup

## Objective

Redesign the current site into a full CLI-inspired interface:

- dark mode by default
- minimalistic
- all monospace
- technical and calm, not flashy
- closer to a premium terminal workspace than a startup landing page

This should feel intentional, not like a novelty hacker theme.

## Hard Visual Direction

The new visual system must follow these rules:

- entire site uses monospace typography only
- dark background palette with subtle tonal separation
- one restrained accent color only, preferably muted cyan, green, or amber
- no purple, no neon rainbow effects, no glossy glassmorphism, no loud gradients
- no generic SaaS cards with soft blob backgrounds
- no rounded-pill-heavy interface
- no sans-serif fallback aesthetic taking over the page

The UI should borrow from:

- terminal multiplexers
- code editors
- command palettes
- log viewers
- shell prompts
- structured dashboard panels with crisp dividers

## Product Constraint

Preserve all existing product behavior and routes:

- homepage
- blog index
- individual article page
- tag pages
- about page
- contact page
- admin login
- admin subscribers
- admin inquiries

Do not remove functionality. This is a visual and interaction redesign, not a product rewrite.

## Design System Requirements

Implement a cohesive CLI theme across the whole app:

- define root CSS variables for background, surface, border, muted text, primary text, accent, success, and error
- use layered dark surfaces instead of flat black
- use sharp radii or very small radii only
- rely on borders, separators, spacing, and type weight instead of shadows
- use subtle grid, scanline, or terminal texture treatments only if they remain quiet
- use monospace hierarchy through size, spacing, case, and opacity rather than mixing font families

## Layout Direction

Avoid centered generic hero sections. Prefer layouts that feel like real tools:

- split panels
- command-console framing
- status bars
- metadata rails
- docked navigation
- article layouts that resemble reading inside an editor or terminal document viewer

Homepage can be more expressive, but article pages must stay extremely readable for long-form content.

## Component Direction

Translate the CLI theme into components:

- nav should feel like a top command bar or workspace header
- buttons should feel like terminal actions, not marketing CTAs
- forms should feel like structured input panes
- cards should feel like panels, logs, or command result regions
- tags should feel like compact labeled tokens
- admin tables/lists should feel like operator dashboards
- table of contents should feel like a file outline or symbol navigator

Use subtle interaction states:

- hover via border or background shift
- active states via slight press or inset change
- loading states via skeleton lines or command-processing feel
- empty states that look like clean system states, not cartoon placeholders

## Content And Article Rules

Long-form reading still matters, so do not let the theme become gimmicky.

- article typography must remain easy to read despite being monospace
- line length must stay controlled
- headings, code blocks, blockquotes, metadata, and tables should all fit the CLI system
- preserve strong spacing rhythm
- keep draft/published and tag metadata visually crisp

## Implementation Constraints

- preserve existing Next.js App Router structure
- preserve Server Actions and current behavior
- preserve existing MDX pipeline
- preserve accessibility and responsiveness
- keep the diff focused on styling, layout, and component presentation
- avoid unnecessary refactors unrelated to the theme

## Specific Aesthetic Targets

Aim for:

- dark graphite or black-blue canvas
- soft border contrast
- terminal pane composition
- subtle status-line accents
- restrained syntax-like color cues
- editor-grade spacing and alignment

Avoid:

- fake retro CRT gimmicks
- green-on-black novelty terminal cosplay
- glow-heavy cyberpunk styling
- decorative gradients
- oversized marketing sections
- mixed visual metaphors

## Deliverable

Implement the redesign in this repo and finish with:

- concise change summary
- exact verification commands run
- any design tradeoffs made
- any remaining follow-up items
