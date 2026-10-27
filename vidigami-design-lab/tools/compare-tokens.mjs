#!/usr/bin/env node
/**
 * Cross-references Vidigami's Figma tokens with MUI's defaults and writes
 * design-system/tokens/comparison-report.md.
 * Run: npm run tokens:compare
 */
import { readFileSync, writeFileSync } from 'node:fs';

const dir = 'design-system/tokens';
const figma = JSON.parse(readFileSync(`${dir}/figma-tokens.json`, 'utf8'));
const mui = JSON.parse(readFileSync(`${dir}/mui-default-theme.json`, 'utf8'));

// Look up an MUI theme path such as "palette.primary.main" in the reference file.
function muiValue(path) {
  const keys = path.split('.');
  let node = keys[0] === 'palette' ? mui.palette.light : mui;
  for (const key of keys[0] === 'palette' ? keys.slice(1) : keys) {
    if (node == null) return undefined;
    node = node[key];
  }
  return node;
}

const norm = (v) => String(v).toLowerCase().replace(/\s+/g, '');

const rows = figma.tokens.map((t) => {
  const target = t.mui ? `\`${t.mui}\`` : t.constants ? `\`constants.${t.constants}\`` : '—';
  const base = t.mui ? muiValue(t.mui) : undefined;
  let status;
  if (t.value === null || t.value === undefined) status = '⬜ Not imported — MUI default applies';
  else if (!t.mui && t.constants) status = '🟣 Vidigami-only token';
  else if (!t.mui) status = '⚠️ No mapping — decide MUI path or constants';
  else if (base === undefined) status = '⚠️ MUI path not found — check spelling';
  else if (norm(base) === norm(t.value)) status = '⚪ Same as MUI default (could remove)';
  else status = '🔵 Vidigami override';
  const show = (v) => (v === undefined || v === null ? '—' : `\`${typeof v === 'object' ? 'object' : v}\``);
  return `| \`${t.name}\` | ${show(t.value)} | ${target} | ${show(base)} | ${status} |`;
});

const count = (s) => rows.filter((r) => r.includes(s)).length;

const report = `# Token comparison: Vidigami (Figma) vs MUI defaults

Generated ${new Date().toISOString().slice(0, 10)} by \`npm run tokens:compare\`.
MUI reference: ${mui.$meta?.muiVersion ?? 'unknown'} — ${mui.$meta?.status ?? ''}

| Summary | Count |
|---|---|
| 🔵 Vidigami overrides | ${count('🔵')} |
| 🟣 Vidigami-only tokens | ${count('🟣')} |
| ⚪ Same as MUI default | ${count('⚪')} |
| ⚠️ Needs attention | ${count('⚠️')} |
| ⬜ Not imported yet | ${count('⬜')} |

| Figma token | Vidigami value | Maps to | MUI default | Status |
|---|---|---|---|---|
${rows.join('\n')}
`;

writeFileSync(`${dir}/comparison-report.md`, report);
console.log(`Wrote ${dir}/comparison-report.md (${rows.length} tokens)`);
