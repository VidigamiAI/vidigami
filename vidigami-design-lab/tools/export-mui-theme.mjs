#!/usr/bin/env node
/**
 * Exports MUI's complete default theme (light + dark) from the installed @mui/material
 * package to design-system/tokens/mui-default-theme.json.
 * Run: npm run tokens:mui   (after npm install)
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createTheme } from '@mui/material/styles';

const require = createRequire(import.meta.url);
const { version } = JSON.parse(readFileSync(require.resolve('@mui/material/package.json'), 'utf8'));

// Drop functions (spacing(), breakpoints.up(), etc.) — keep plain values only.
const plain = (obj) =>
  JSON.parse(JSON.stringify(obj, (key, value) => (typeof value === 'function' ? undefined : value)));

const light = createTheme();
const dark = createTheme({ palette: { mode: 'dark' } });

const out = {
  $meta: {
    description: 'MUI default theme values — the base Vidigami builds on. Reference only.',
    muiVersion: version,
    status: 'Generated from the installed package',
    generated: new Date().toISOString().slice(0, 10),
  },
  palette: { light: plain(light.palette), dark: plain(dark.palette) },
  typography: plain(light.typography),
  spacing: { unitPx: 8, example: { 'spacing(1)': light.spacing(1), 'spacing(2)': light.spacing(2) } },
  shape: plain(light.shape),
  breakpoints: plain(light.breakpoints.values),
  zIndex: plain(light.zIndex),
  transitions: { easing: plain(light.transitions.easing), duration: plain(light.transitions.duration) },
  shadows: plain(light.shadows),
};

writeFileSync('design-system/tokens/mui-default-theme.json', JSON.stringify(out, null, 2) + '\n');
console.log(`Exported MUI ${version} default theme → design-system/tokens/mui-default-theme.json`);
