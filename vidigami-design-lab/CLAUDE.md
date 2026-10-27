# Vidigami Design Lab

## What this repo is
The design workspace of Steven, the sole product designer at Vidigami — a private, secure
community photo management platform for schools (educators, families, students).
This is a **prototyping and design-system repo**, not production. Nothing here ships to users.
Prototypes exist to explore, test and hand off ideas to engineering.

## Working agreement (most important)
@.claude/rules/working-agreement.md

In short: **Claude is an execution accelerator. Steven owns UX architecture, problem-solving,
creative direction and every final decision.** Offer options with trade-offs; never pick the
direction. Flag assumptions. Ask before any decision that shapes the user experience.

## Tech stack (mirrors Vidigami production so prototypes are handoff-realistic)
- React 19 + TypeScript + Vite, React Router
- Material UI (MUI) v7 + Emotion — Vidigami's production UI library is built on MUI with light customization
- Production also ships to iOS/Android via Capacitor (same React app in a native WebView),
  so every screen must work at phone width. We do NOT run Capacitor here.
- Production packages `@vidigami/ui` and `@vidigami/components` are NOT available in this repo.
  We approximate them with MUI components + our theme. Note in handoff when a prototype
  uses a stand-in for a production component.

## Design tokens — two sources, one theme
- `design-system/tokens/figma-tokens.json` — Vidigami's tokens exported from Figma (our overrides)
- `design-system/tokens/mui-default-theme.json` — MUI v7's default theme (the base we build on)
- `src/theme/theme.ts` merges them: MUI defaults, then Vidigami overrides on top.
- See `design-system/tokens/README.md` for how they relate. Never hardcode colors, spacing,
  radii or font sizes — always use `theme.*` values.

## Folder map
- `design-system/` — principles, voice & tone, content design, governance, style guide, tokens
- `personas/` — draft personas for simulated walkthroughs (Steven validates them)
- `projects/<JIRA-KEY>-<slug>/` — one folder per Jira ticket: brief, decisions, prototype, reviews.
  Each has its own CLAUDE.md that loads only when working in that folder.
- `projects/_template/` — copied by the `/new-project` skill
- `src/` — shared app shell, theme, shared prototype components, project gallery
- `tools/` — helper scripts (token export, token comparison, token check)

## Commands (Claude runs these; Steven never needs to)
- `npm install` — first-time setup
- `npm run dev` — start the prototype gallery at http://localhost:5173
- `npm run build` — check everything compiles
- `npm run tokens:mui` — re-export MUI's default theme to JSON
- `npm run tokens:compare` — report how Vidigami tokens differ from MUI defaults

## Hard rules
- Student privacy: @.claude/rules/student-privacy.md
- Accessibility baseline: WCAG 2.2 AA (details in `.claude/rules/accessibility.md`)
- Tokens only in prototype code (details in `.claude/rules/tokens-only.md`)
- Write copy following `design-system/voice-and-tone.md` and `design-system/content-design.md`.

## Explaining work to Steven
Steven is non-technical. Explain what you did and why in plain language, skip code walkthroughs
unless asked, and show results (screenshots, the running prototype) rather than describing code.
