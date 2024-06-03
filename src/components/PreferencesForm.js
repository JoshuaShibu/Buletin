import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { getNewsSources } from '../services/newsService';

const interests = {
  categories: ['Technology', 'Sports', 'Business', 'Entertainment', 'Health'],
  keywords: ['AI', 'Bitcoin', 'COVID-19', 'Elections', 'Climate Change']
};

const apiValues = {
  'Technology': 'technology',
  'Sports': 'sports',
  'Business': 'business',
  'Entertainment': 'entertainment',
  'Health': 'health',
  'AI': 'ai',
  'Bitcoin': 'bitcoin',
  'COVID-19': 'covid-19',
  'Elections': 'elections',
  'Climate Change': 'climate-change'
};

const PreferencesForm = ({ onSave }) => {
  const [selectedSources, setSelectedSources] = useState(() => {
    const savedSources = localStorage.getItem('selectedSources');
    return savedSources ? JSON.parse(savedSources) : [];
  });
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const savedCategories = localStorage.getItem('selectedCategories');
    return savedCategories ? JSON.parse(savedCategories) : [];
  });
  const [selectedKeywords, setSelectedKeywords] = useState(() => {
    const savedKeywords = localStorage.getItem('selectedKeywords');
    return savedKeywords ? JSON.parse(savedKeywords) : [];
  });
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsSources = async () => {
      try {
        const response = await getNewsSources();
        setSources(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news sources:', error);
        setLoading(false);
      }
    };

    fetchNewsSources();
  }, []);

  const handleToggle = (item, setSelected, selected) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('selectedSources', JSON.stringify(selectedSources));
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    localStorage.setItem('selectedKeywords', JSON.stringify(selectedKeywords));

    onSave({
      sources: selectedSources,
      categories: selectedCategories.map(category => apiValues[category]),
      keywords: selectedKeywords.map(keyword => apiValues[keyword])
    });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <Typography variant="subtitle1">Sources</Typography>
        {sources.map(source => (
          <Button
            key={source.id}
            variant={selectedSources.includes(source.id) ? 'contained' : 'outlined'}
            onClick={() => handleToggle(source.id, setSelectedSources, selectedSources)}
            sx={{ margin: '5px' }}
          >
            {source.name}
          </Button>
        ))}
      </Box>
      <Box mb={2}>
        <Typography variant="subtitle1">Categories</Typography>
        {interests.categories.map(category => (
          <Button
            key={category}
            variant={selectedCategories.includes(category) ? 'contained' : 'outlined'}
            onClick={() => handleToggle(category, setSelectedCategories, selectedCategories)}
            sx={{ margin: '5px' }}
          >
            {category}
          </Button>
        ))}
      </Box>
      <Box mb={2}>
        <Typography variant="subtitle1">Keywords</Typography>
        {interests.keywords.map(keyword => (
          <Button
            key={keyword}
            variant={selectedKeywords.includes(keyword) ? 'contained' : 'outlined'}
            onClick={() => handleToggle(keyword, setSelectedKeywords, selectedKeywords)}
            sx={{ margin: '5px' }}
          >
            {keyword}
          </Button>
        ))}
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Save Preferences
      </Button>
    </form>
  );
};

export default PreferencesForm;
