import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <CircularProgress
      enableTrackSlot
      size="30px"
      sx={{
        color: 'var(--color-loader)',
        position: 'absolute',
        top: '50%',
        left: '49%',
      }}
    />
  );
};

export default Loading;
