# Tools

Helper scripts Claude runs for you. You don't need to run these yourself.

| Script | What it does | Run with |
|---|---|---|
| `check-tokens.mjs` | Flags hardcoded colors and sizes. Runs automatically after every edit Claude makes (a "hook"). | `npm run tokens:check` |
| `export-mui-theme.mjs` | Saves MUI's full default theme to `design-system/tokens/mui-default-theme.json` | `npm run tokens:mui` |
| `compare-tokens.mjs` | Writes a side-by-side report of Vidigami's Figma tokens vs MUI defaults | `npm run tokens:compare` |

## Accessibility scans
`tests/a11y.spec.ts` uses Playwright (a robot browser) and axe-core (an accessibility scanner)
at phone and desktop sizes. First time only: `npx playwright install chromium`.
Then: `A11Y_PATHS=/p/<project-folder> npm run test:a11y`.
