import React, { useState } from 'react';
import { Typography, Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import ReactCardSlider from 'react-card-slider-component';
import SingleNews from './SingleNews';
import '../styles/LatestNews.css';

const LatestNews = ({ newsData }) => {
  const [selectedNews, setSelectedNews] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNewsClick = (news) => {
    setSelectedNews(news);
  };

  const handleClose = () => {
    setSelectedNews(null);
  };

  return (
    <>
      <Box className="latest-news-wrapper">
        <Typography variant="h4" gutterBottom sx={{ marginBottom: '50px' }}>
          Latest News
        </Typography>
        <Grid container spacing={isSmallScreen ? 1 : 2}>
          <ReactCardSlider
            slides={newsData.map((news) => ({
              ...news,
              clickEvent: () => handleNewsClick(news),
            }))}
          />
        </Grid>
        {selectedNews && (
          <SingleNews
            news={selectedNews}
            open={Boolean(selectedNews)}
            onClose={handleClose}
          />
        )}
      </Box>
    </>
  );
};

export default LatestNews;
