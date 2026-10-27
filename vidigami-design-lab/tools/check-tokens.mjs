#!/usr/bin/env node
/**
 * Flags hardcoded design values (hex/rgb colors, raw px sizes) in prototype code.
 *
 * Two ways to run:
 *  1. As a Claude Code hook (default): reads the hook's JSON from stdin, checks the one file
 *     Claude just edited. Exit code 2 sends the findings back to Claude to fix.
 *  2. Manually: node tools/check-tokens.mjs --all src projects
 *
 * src/theme/ is exempt — the theme is the one place raw values belong.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const CODE = /\.(tsx?|jsx?|css)$/;
const EXEMPT = [`src${sep}theme${sep}`, `${sep}node_modules${sep}`];

const RULES = [
  { re: /#[0-9a-fA-F]{3,8}\b/g, why: 'hex color — use theme.palette (e.g. "primary.main")' },
  { re: /\brgba?\(/g, why: 'rgb() color — use theme.palette' },
  { re: /\b\d+px\b/g, why: 'raw px — use theme.spacing(n) or the sx spacing scale' },
  { re: /fontSize:\s*['"]?\d/g, why: 'raw font size — use a Typography variant' },
];

function inScope(file) {
  const rel = relative(ROOT, file);
  if (!CODE.test(rel)) return false;
  if (EXEMPT.some((e) => rel.includes(e) || (sep + rel).includes(e))) return false;
  return rel.startsWith(`src${sep}`) || rel.startsWith(`projects${sep}`);
}

function check(file) {
  const findings = [];
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;
      if (line.includes('tokens-ok')) return; // explicit, reviewed exception
      RULES.forEach(({ re, why }) => {
        for (const m of line.matchAll(re)) {
          findings.push(`${relative(ROOT, file)}:${i + 1}  "${m[0]}"  ${why}`);
        }
      });
    });
  return findings;
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

async function readStdin() {
  if (process.stdin.isTTY) return '';
  let data = '';
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

const args = process.argv.slice(2);
let files = [];
const hookMode = !args.includes('--all');

if (hookMode) {
  const raw = await readStdin();
  try {
    const input = JSON.parse(raw || '{}');
    const path = input?.tool_input?.file_path;
    if (path) files = [path];
  } catch {
    process.exit(0); // not hook input; nothing to do
  }
} else {
  const dirs = args.filter((a) => a !== '--all');
  files = (dirs.length ? dirs : ['src', 'projects']).flatMap((d) => walk(join(ROOT, d)));
}

const findings = files.filter(inScope).flatMap(check);

if (findings.length) {
  const msg =
    `Token check: ${findings.length} hardcoded value(s) found. Replace with theme tokens, ` +
    `or tell Steven if the theme is missing a token.\n` +
    findings.map((f) => `  - ${f}`).join('\n');
  if (hookMode) {
    console.error(msg);
    process.exit(2);
  }
  console.log(msg);
  process.exit(1);
}
if (!hookMode) console.log('Token check: no hardcoded values found.');
