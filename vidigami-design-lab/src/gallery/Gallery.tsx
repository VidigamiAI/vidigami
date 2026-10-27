import { Link as RouterLink } from 'react-router';
import { Box, Card, CardActionArea, CardContent, Chip, Typography } from '@mui/material';
import { projects } from './projects';

export default function Gallery() {
  return (
    <Box component="main" sx={{ p: { xs: 2, md: 4 }, maxWidth: 'lg', mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Projects
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        One card per Jira ticket. New projects appear here automatically.
      </Typography>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          p: 0,
          m: 0,
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        }}
      >
        {projects.map(({ slug, meta }) => (
          <li key={slug}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardActionArea component={RouterLink} to={`/p/${slug}`} sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    {meta.key}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    {meta.title}
                  </Typography>
                  {meta.summary && (
                    <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                      {meta.summary}
                    </Typography>
                  )}
                  <Chip size="small" label={meta.status} />
                </CardContent>
              </CardActionArea>
            </Card>
          </li>
        ))}
      </Box>
    </Box>
  );
}
