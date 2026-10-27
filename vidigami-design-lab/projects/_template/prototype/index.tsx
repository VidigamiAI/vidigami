import { Box, Typography } from '@mui/material';
import type { ProjectMeta } from '../../../src/gallery/types';

// Shown on the gallery home page. Update when the project is created.
export const meta: ProjectMeta = {
  key: 'JIRA-KEY',
  title: 'Project name',
  status: 'exploring',
};

export default function Prototype() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1">
        {meta.title}
      </Typography>
      <Typography color="text.secondary">Prototype screens go here.</Typography>
    </Box>
  );
}
