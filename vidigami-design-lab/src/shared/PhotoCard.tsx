import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import LockOutlined from '@mui/icons-material/LockOutlined';
import PhotoOutlined from '@mui/icons-material/PhotoOutlined';

export type PhotoVisibility = 'school' | 'class' | 'family';

export type PhotoCardProps = {
  caption: string;
  album: string;
  tagged: string[];
  visibility: PhotoVisibility;
  /** Names of tagged students whose photo consent is withheld. */
  restricted?: string[];
  placeholderTone?: 'primary' | 'secondary' | 'info' | 'success';
};

const visibilityLabel: Record<PhotoVisibility, string> = {
  school: 'Whole school',
  class: 'Class only',
  family: 'Tagged families only',
};

/**
 * Prototype stand-in for the production photo card.
 * Uses a placeholder tile instead of an image — never real photos of children.
 */
export default function PhotoCard({
  caption,
  album,
  tagged,
  visibility,
  restricted = [],
  placeholderTone = 'primary',
}: PhotoCardProps) {
  const hasRestriction = restricted.length > 0;
  return (
    <Card variant="outlined" component="article" sx={{ height: '100%' }}>
      <Box
        role="img"
        aria-label={`Placeholder photo: ${caption}`}
        sx={{
          aspectRatio: '4 / 3',
          bgcolor: `${placeholderTone}.light`,
          color: `${placeholderTone}.contrastText`,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <PhotoOutlined fontSize="large" />
      </Box>
      <CardContent>
        <Typography variant="subtitle1" component="h3">
          {caption}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {album} · {visibilityLabel[visibility]}
        </Typography>
        <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {tagged.map((name) => (
            <Chip
              key={name}
              size="small"
              label={name}
              icon={restricted.includes(name) ? <LockOutlined /> : undefined}
              color={restricted.includes(name) ? 'warning' : 'default'}
              variant={restricted.includes(name) ? 'outlined' : 'filled'}
            />
          ))}
        </Stack>
        {hasRestriction && (
          <Typography variant="caption" color="warning.dark" component="p" sx={{ mt: 1 }}>
            Hidden from families until {restricted.join(', ')} {restricted.length > 1 ? 'are' : 'is'} untagged.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
