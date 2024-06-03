import React, { useEffect, useState } from 'react';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import PreferencesPage from './components/PreferencesPage';
import LatestNews from './components/LatestNews';
import Header from './components/Header';
import Container from '@mui/material/Container';
import BannerSlider from './components/BannerSlider';
import SearchFilter from './components/SearchFilter';
import { getFilteredNews, getTopHeadlines } from './services/newsService';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import './styles/App.css';

const App = ({ history }) => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);
    const articles = await getFilteredNews(filters);

    const today = new Date();
    const fiveDaysEarlier = new Date();
    fiveDaysEarlier.setDate(today.getDate() - 5);

    const filteredLatestNews = articles.filter(article => {
      const publishedDate = new Date(article.publishedAt);
      return (publishedDate <= today && publishedDate >= fiveDaysEarlier);
    });

    setLatestNews(filteredLatestNews);
    setFilteredArticles(articles);
    setIsFiltered(true);
    setLoading(false);
  };

  const fetchInitialNews = async () => {
    setLoading(true);
    const articles = await getTopHeadlines();
    setFilteredArticles(articles);
    setLatestNews(articles);
    setLoading(false);
    setReset(true);
    setTimeout(() => setReset(false), 0); // Reset the `reset` state immediately after
  };

  useEffect(() => {
    if (!isFiltered) {
      fetchInitialNews();
    }
  }, [isFiltered]);

  const RouterComponent = history ? Router : BrowserRouter;

  return (
    <RouterComponent history={history}>
      <div>
        <Header />
        <Container className='main-wrapper' maxWidth="xl">
          <Routes>
            <Route path="/preferences" element={<PreferencesPage />} />
            <Route path="/" element={
              <>
                <SearchFilter onSearch={handleSearch} reset={reset} />
                {loading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <CircularProgress data-testid="app-main-loader" />
                  </Box>
                ) : (
                  <>
                    {filteredArticles.length === 0 ? (
                      <div className='no-results'>
                        <Typography variant="h6" color="textSecondary" align="center">
                          No results found. Please try different filters or click
                        </Typography><Button
                          variant="text"
                          color="primary"
                          onClick={fetchInitialNews}
                          sx={{ marginLeft: '4px' }}
                        >
                          Reset
                        </Button>
                      </div>
                    ) : (
                      <>
                        <BannerSlider newsData={filteredArticles} />
                        <LatestNews newsData={latestNews} />
                      </>
                    )}
                  </>
                )}
              </>
            } />
          </Routes>
        </Container>
      </div>
    </RouterComponent>
  );
};

export default App;
