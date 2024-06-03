import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = styled('button')({
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '50%',
  border: 'none',
  padding: '8px',
  cursor: 'pointer',
  zIndex: 1500,
});

const SingleNews = ({ news, open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      PaperProps={{ style: { borderRadius: '14px' } }}
    >
      <DialogContent>
        {fullScreen && (
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        )}
        <Box >
          <Box >
            <img
              src={news.image}
              alt={news.title}
              style={{ width: '100%', height: '200px', borderRadius: '8px', objectFit: 'cover' }}
            />
          </Box>
          <Box sx={{ padding: '12px' }}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: fullScreen ? '24px' : '32px' }}>
              {news.title}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: fullScreen ? '14px' : '16px' }}>
              {news.description}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: fullScreen ? '14px' : '16px' }}>
              {news.content}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: fullScreen ? '12px' : '14px' }}>
              {news.author} - {new Date(news.publishedAt).toLocaleDateString()}
            </Typography>
            <Box sx={{ marginTop: '10px' }}>
              <Link sx={{ my: 20 }} href={news.url}>
                Read full article here...
              </Link>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SingleNews;
