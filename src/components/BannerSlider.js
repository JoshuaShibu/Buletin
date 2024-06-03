import React from 'react';
import { Typography, CardMedia, CardContent, Grid, Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import '../styles/SliderComponent.css';

const BannerSlider = ({ newsData }) => {
  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="banner-slider-container">
      <Typography variant="h4" gutterBottom>
        Top Picks 
      </Typography>
      <Carousel indicators={false} interval={30000} sx={{ height: { xs: 'auto', md: '240px' } }}>
        {newsData && newsData.map((news, index) => (
          <Box key={index} className="carousel-card">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <CardMedia
                  component="img"
                  height="200"
                  image={news.image || 'https://via.placeholder.com/150'}
                  alt={news.title}
                  className="carousel-media"
                  sx={{ objectFit: 'cover' }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <CardContent className="carousel-content">
                  <Typography variant="h5" component="div" sx={{ margin: '8px 0px', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                    {news.title}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ marginBottom: '12px', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    {news.content}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="span">
                    <EditLocationAltIcon fontSize="small" /> {news.author} . {getFormattedDate(news.publishedAt)}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerSlider;
