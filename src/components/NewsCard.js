import React from 'react';
import { Box, Typography, Grid, Link, useMediaQuery, useTheme } from '@mui/material';

const NewsCard = ({ article }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        margin: '12px 0',
        width: '100%',
        height: isSmallScreen ? 'auto' : '200px',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        sx={{
          width: isSmallScreen ? '100%' : 200,
          height: isSmallScreen ? 'auto' : '100%',
          objectFit: 'cover',
          borderRadius: '20px',
        }}
        src={article.image}
      />
      <Grid
        container
        sx={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginLeft: isSmallScreen ? '0' : '16px',
          padding: '16px',
        }}
      >
        <Box>
          <Typography component="div" variant={isSmallScreen ? 'h6' : 'h5'}>
            {article.content}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {article.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: '14px' }}>
            {article.author} - {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>
          <Box sx={{ marginTop: '10px' }}>
            <Link sx={{ my: 20 }} href={article.url}>
              Read full article here...
            </Link>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default NewsCard;
