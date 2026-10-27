import { Link as RouterLink, Route, Routes, useParams } from 'react-router';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { projects } from './gallery/projects';
import Gallery from './gallery/Gallery';
import TokensPage from './gallery/TokensPage';

function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return (
      <Box component="main" sx={{ p: 3 }}>
        <Typography variant="h5" component="h1">
          Project not found
        </Typography>
      </Box>
    );
  }
  const { Component } = project;
  return (
    <Box component="main">
      <Component />
    </Box>
  );
}

export default function App() {
  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar component="nav" aria-label="Design lab" sx={{ gap: 1 }}>
          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            Vidigami Design Lab
          </Typography>
          <Button component={RouterLink} to="/">
            Projects
          </Button>
          <Button component={RouterLink} to="/tokens">
            Tokens
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/tokens" element={<TokensPage />} />
        <Route path="/p/:slug" element={<ProjectPage />} />
      </Routes>
    </>
  );
}
