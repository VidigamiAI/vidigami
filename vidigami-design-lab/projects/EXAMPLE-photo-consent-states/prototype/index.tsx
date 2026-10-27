import { useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import type { ProjectMeta } from '../../../src/gallery/types';
import PhotoCard, { type PhotoCardProps } from '../../../src/shared/PhotoCard';

export const meta: ProjectMeta = {
  key: 'EXAMPLE',
  title: 'Photo consent states (example)',
  status: 'exploring',
  summary: 'Sample project showing how a prototype lives in the lab. Safe to delete.',
};

const photos: PhotoCardProps[] = [
  { caption: 'Science fair volcanoes', album: 'Grade 4 · Science', tagged: ['Maya Okafor', 'Sam Rivera'], visibility: 'family' },
  { caption: 'Spring concert warm-up', album: 'Music', tagged: ['Jordan Lee', 'Ana Silva', 'Theo Okafor'], visibility: 'school', restricted: ['Ana Silva'], placeholderTone: 'secondary' },
  { caption: 'Field trip to the aquarium', album: 'Grade 4 · Trips', tagged: ['Maya Okafor'], visibility: 'class', placeholderTone: 'info' },
  { caption: 'Art studio portraits', album: 'Visual Arts', tagged: [], visibility: 'school', placeholderTone: 'success' },
];

type Variation = 'grid' | 'list';

export default function Prototype() {
  const [variation, setVariation] = useState<Variation>('grid');
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 'lg', mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tagged photos
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Variation switcher — each option is a different layout idea for the same content.
      </Typography>
      <ToggleButtonGroup
        value={variation}
        exclusive
        onChange={(_, value: Variation | null) => value && setVariation(value)}
        aria-label="Layout variation"
        sx={{ mb: 3 }}
      >
        <ToggleButton value="grid">A · Grid</ToggleButton>
        <ToggleButton value="list">B · List</ToggleButton>
      </ToggleButtonGroup>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns:
            variation === 'grid' ? { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' } : '1fr',
          maxWidth: variation === 'list' ? 'sm' : undefined,
        }}
      >
        {photos.map((photo) => (
          <PhotoCard key={photo.caption} {...photo} />
        ))}
      </Box>
    </Box>
  );
}
