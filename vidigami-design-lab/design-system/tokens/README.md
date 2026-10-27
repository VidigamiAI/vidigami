# Design tokens: Figma + MUI, cross-referenced

Vidigami is built on MUI with light customization. So there are two layers:

```
MUI default theme  ──(base)──┐
                             ├──►  src/theme/theme.ts  ──►  every prototype
Vidigami Figma tokens ─(overrides + custom)─┘
```

| File | What it is | Who updates it |
|---|---|---|
| `mui-default-theme.json` | MUI's out-of-the-box values (palette, type scale, spacing, breakpoints…) | `npm run tokens:mui` regenerates it from the installed MUI package |
| `figma-tokens.json` | Vidigami's tokens from Figma | Claude syncs from your Figma file via the Figma connector |
| `comparison-report.md` | Side-by-side: where Vidigami matches MUI, overrides it, or adds its own | `npm run tokens:compare` |

## How a Figma token connects to MUI
Each entry in `figma-tokens.json` has:
- `"mui": "palette.primary.main"` → this Vidigami value **replaces** that MUI default, or
- `"constants": "space.L"` → a **Vidigami-only** token with no MUI equivalent. These go into
  `theme.constants`, the same namespace production uses (e.g. `theme.constants.space.L`).
- `"value": null` → not imported yet, so MUI's default applies.

## Why keep both
- Designing: you can see at a glance which decisions are Vidigami's vs. inherited from MUI.
- Auditing: drift is visible — a Figma value that silently differs from code, or a custom
  token that duplicates an MUI one.
- Handoff: engineers know which MUI theme keys to set.

## Syncing from Figma
Share the link to your Figma token file and say "sync tokens from Figma". Claude reads the
variables with the Figma connector, fills `figma-tokens.json`, maps each to an MUI path (asking
you when the mapping is ambiguous), then runs the comparison.
