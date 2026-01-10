import { Typography, Button, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

const NotFound = () => {
  return (
    <>
      <Box
        sx={{
          textTransform: 'uppercase',
          backgroundColor: 'var(--color-bg-text)',
          letterSpacing: 'var(--letter-spacing-md)',
        }}
      >
        <Typography
          variant="h3"
          component="p"
          padding={5}
          textAlign={'center'}
          color="var(--color-text)"
        >
          404 — not found page 😞
        </Typography>
        <Button
          component={NavLink}
          to="/"
          sx={{
            color: 'var( --color-text-button)',
            display: 'flex',
            backgroundColor: 'var(--color-bg-button)',
            borderRadius: 0,
            fontSize: '1.25rem',
          }}
          endIcon={<PanToolAltIcon />}
        >
          go to homepage
        </Button>
      </Box>
    </>
  );
};

export default NotFound;
