import { Box, Paper, Typography, useTheme } from '@mui/material';
import type { TypographyVariant } from '@mui/material/styles';

const colorGroups = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
const shades = ['light', 'main', 'dark'] as const;
const typeScale: TypographyVariant[] = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline',
];

/** Live view of the merged theme — what prototypes actually use. */
export default function TokensPage() {
  const theme = useTheme();
  return (
    <Box component="main" sx={{ p: { xs: 2, md: 4 }, maxWidth: 'lg', mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Theme tokens
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        MUI defaults with Vidigami overrides applied. Edit Figma, sync, and this page updates.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Color
      </Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, mb: 4 }}>
        {colorGroups.map((group) => (
          <Paper key={group} variant="outlined" sx={{ overflow: 'hidden' }}>
            {shades.map((shade) => (
              <Box
                key={shade}
                sx={{ bgcolor: `${group}.${shade}`, color: `${group}.contrastText`, px: 2, py: 1.5 }}
              >
                <Typography variant="body2">
                  {group}.{shade} · {theme.palette[group][shade]}
                </Typography>
              </Box>
            ))}
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" component="h2" gutterBottom>
        Typography
      </Typography>
      <Box sx={{ mb: 4 }}>
        {typeScale.map((variant) => (
          <Box key={variant} sx={{ display: 'flex', gap: 2, alignItems: 'baseline', py: 1, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary" sx={{ width: 96, flexShrink: 0 }}>
              {variant}
            </Typography>
            <Typography variant={variant} component="p" noWrap>
              School stories
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="h5" component="h2" gutterBottom>
        Spacing
      </Typography>
      {[1, 2, 3, 4, 6, 8].map((n) => (
        <Box key={n} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="caption" sx={{ width: 96 }}>
            spacing({n}) · {theme.spacing(n)}
          </Typography>
          <Box sx={{ width: theme.spacing(n), height: theme.spacing(2), bgcolor: 'primary.main' }} />
        </Box>
      ))}
    </Box>
  );
}
