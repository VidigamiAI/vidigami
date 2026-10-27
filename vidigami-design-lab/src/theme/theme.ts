import { createTheme, type ThemeOptions } from '@mui/material/styles';
import figma from '../../design-system/tokens/figma-tokens.json';

/**
 * Vidigami prototype theme = MUI defaults + Vidigami overrides from Figma.
 *
 * - Tokens with a `mui` path override that MUI default.
 * - Tokens with a `constants` path go into `theme.constants` (Vidigami-only values,
 *   mirroring production's `theme.constants.*`).
 * - Tokens with a null value are skipped, so MUI's default applies.
 *
 * This is the only file allowed to contain raw values.
 */

type FigmaToken = {
  name: string;
  type: string;
  value: string | number | null;
  mui?: string;
  constants?: string;
};

type Nested = { [key: string]: unknown };

function setPath(target: Nested, path: string, value: unknown) {
  const keys = path.split('.');
  let node = target;
  keys.slice(0, -1).forEach((key) => {
    if (typeof node[key] !== 'object' || node[key] === null) node[key] = {};
    node = node[key] as Nested;
  });
  node[keys[keys.length - 1]] = value;
}

const overrides: Nested = {};
const constants: Nested = {};

(figma.tokens as FigmaToken[]).forEach((token) => {
  if (token.value === null || token.value === undefined) return;
  if (token.mui) setPath(overrides, token.mui, token.value);
  if (token.constants) setPath(constants, token.constants, token.value);
});

declare module '@mui/material/styles' {
  interface Theme {
    constants: Record<string, unknown>;
  }
  interface ThemeOptions {
    constants?: Record<string, unknown>;
  }
}

export const theme = createTheme({
  ...(overrides as ThemeOptions),
  constants,
});
