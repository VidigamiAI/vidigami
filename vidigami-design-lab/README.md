# Vidigami Design Lab — start here

Your prototyping and design-system workspace for Claude Code. Claude reads `CLAUDE.md`
automatically and follows the rules, skills and agents in `.claude/`.

## One-time setup (about 20 minutes)

1. **Put this folder on GitHub** as a *private* repository (e.g. `vidigami-design-lab`).
   GitHub is what keeps your Mac and PC in sync — see "Working on two computers" below.
   Easiest non-technical route: GitHub Desktop → "Add existing repository" → Publish (private).
2. **Open it in Claude Code.** Either the Claude desktop app (Code tab → open this folder),
   or claude.ai/code in the browser (pick the repository and your "Vidigami" environment).
3. **Ask Claude to finish setup** — paste this as your first message:
   > Run first-time setup: install packages, export the MUI default theme, run the token
   > comparison, install the Playwright browser, and start the gallery. Explain anything
   > that needs me.
4. **Connect Figma and Jira** when Claude prompts (it uses `.mcp.json`; you'll sign in once
   for each in your browser). Type `/mcp` to see their status.
5. **Bring in your design system** — attach your design system doc and share your Figma token
   file link, then say: "Split my design system doc into the design-system files, and sync
   tokens from Figma."

## Everyday use

| You want to… | Type |
|---|---|
| Start work on a Jira ticket | `/new-project VID-1234` |
| Map the flow and edge cases | `/ux-flow VID-1234-bulk-tagging teacher` |
| See layout options | `/explore-variations VID-1234-bulk-tagging selection-first vs tag-first` |
| Check accessibility | `/a11y-check VID-1234-bulk-tagging` |
| Simulate a user | `/persona-walkthrough VID-1234-bulk-tagging parent` |
| QA against the design system | `/design-system-audit VID-1234-bulk-tagging` |
| Check tokens vs MUI | `/design-system-audit tokens` |

You can also just describe what you want in plain words — skills trigger on their own when
the request matches.

See the prototypes: ask Claude to "start the gallery", then open http://localhost:5173.
The **Tokens** page shows your live theme.

## Working on two computers (Mac + PC)

Your claude.ai chats and cloud sessions belong to your account, so they show up on both
computers. **Files** sync through GitHub:
- **Cloud sessions** (claude.ai/code, using your "Vidigami" environment) run on Anthropic's
  servers and work from the GitHub repo, so you can start on the Mac and continue on the PC.
  Claude saves work to a branch on GitHub.
- **Local sessions** (desktop app on one computer) work on that computer's copy. Before
  switching computers, ask Claude to "commit and push my work"; on the other computer, ask it to
  "pull the latest".

The "Vidigami" environment you created is a *settings profile* for cloud sessions (network
access, setup steps). It doesn't store files itself — the GitHub repo does.

## What's where

| Folder | Contents |
|---|---|
| `CLAUDE.md` | What Claude always knows about this repo |
| `.claude/rules/` | Working agreement, student privacy, accessibility, tokens-only |
| `.claude/skills/` | Your six workflows (the slash commands above) |
| `.claude/agents/` | Fresh-eyes reviewers: persona tester, a11y auditor, design-system guardian |
| `design-system/` | Your design system docs + tokens (Figma and MUI) |
| `personas/` | Draft personas — please correct them |
| `projects/` | One folder per Jira ticket (`_template` and an example included) |
| `src/` | The gallery app, theme, shared components |
| `tools/` | Helper scripts Claude runs |

## Personal notes
Create `CLAUDE.local.md` for notes only you want Claude to know. It stays off GitHub.
