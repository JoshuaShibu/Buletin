import React, { useState, useEffect, useRef } from 'react';
import { Typography, Grid, Button, Box, CircularProgress } from '@mui/material';
import NewsCard from './NewsCard';
import { getPersonalizedNews } from '../services/newsService';
import '../styles/PersonalizedFeed.css';

const PersonalizedFeed = ({ preferences }) => {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // Initial number of articles to display
  const [loadMoreClicked, setLoadMoreClicked] = useState(false); // Track if "Load More" button is clicked
  const [loading, setLoading] = useState(true);
  const lastVisibleItemRef = useRef(null);

  useEffect(() => {
    const fetchPersonalizedNews = async () => {
      const newsArticles = await getPersonalizedNews(preferences);
      const items = document.querySelectorAll('.news-item');
      items.forEach((item, index) => {
        if (index < visibleCount) {
          item.classList.add('loaded');
        }
      });
      setArticles(newsArticles);
      setLoading(false);
    };

    fetchPersonalizedNews();
  }, [visibleCount, preferences]);

  const handleLoadMore = () => {
    setLoading(true);
    setVisibleCount(prevCount => prevCount + 5); // Load 5 more articles
    setLoadMoreClicked(true); // Set load more clicked state to true
    setLoading(false);
  };

  useEffect(() => {
    if (loadMoreClicked) {
      const items = document.querySelectorAll('.news-item');
      items.forEach((item, index) => {
        if (index < visibleCount) {
          item.classList.add('loaded');
        }
      });

      // Scroll to the last loaded item
      if (lastVisibleItemRef.current) {
        lastVisibleItemRef.current.scrollIntoView({ behavior: 'smooth' });
      }

      // Reset load more clicked state
      setLoadMoreClicked(false);
    }
  }, [visibleCount, loadMoreClicked]);

  return (
    <div>
      {loading ? ( // Display loader while loading
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          {articles.length === 0 ? (
            <div className='no-results'>
              <Typography variant="h6" color="textSecondary" align="center">
                No results found. Please try to re-edit your preferences.
              </Typography>
            </div>
          ) : (
            <Grid container spacing={2} className="news-grid">
              {articles.slice(0, visibleCount).map((article, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  className="news-item"
                  ref={index === visibleCount - 1 ? lastVisibleItemRef : null} // Set ref to the last visible item
                >
                  <NewsCard
                    article={article}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {visibleCount < articles.length && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <Button variant="contained" color="primary" onClick={handleLoadMore}>
                Load More
              </Button>
            </Box>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalizedFeed;
