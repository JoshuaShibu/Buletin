import React, { useState } from 'react';
import PreferencesForm from './PreferencesForm';
import PersonalizedFeed from './PersonalizedFeed';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const PreferencesPage = () => {
  const [preferences, setPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem('preferences');
    return savedPreferences ? JSON.parse(savedPreferences) : null;
  });
  const [showForm, setShowForm] = useState(!preferences);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [showFiltersPopup, setShowFiltersPopup] = useState(false);

  const handleSavePreferences = (prefs) => {
    setPreferences(prefs);
    localStorage.setItem('preferences', JSON.stringify(prefs));
    setShowForm(false);
  };

  const handleEditPreferences = () => {
    setShowForm(true);
  };
  const handleCloseFiltersPopup = () => {
    setShowFiltersPopup(false);
  };

  return (
    <Box sx={{margin: '0px 40px'}}>
      <Box sx={{ marginBottom: '30px' }}>
        <Typography variant={isSmallScreen ? 'h4' : 'h3'} gutterBottom>
          Your Personalized Feed
        </Typography>
        {preferences && (
          <Box
            sx={{
              backgroundColor: '#f0f0f0',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '30px',
            }}
          >
            {!isSmallScreen && <Stack direction="row" spacing={1} sx={{ marginBottom: '10px' }}>
              {preferences.sources &&
                preferences.sources.map((source, index) => (
                  <Chip key={index} label={source} variant="outlined" />
                ))}
              {preferences.categories.map((category, index) => (
                <Chip key={index} label={category} variant="outlined" />
              ))}
              {preferences.keywords &&
                preferences.keywords.map((keyword, index) => (
                  <Chip key={index} label={keyword} variant="outlined" />
                ))}
            </Stack>}
            <Button variant="outlined" onClick={handleEditPreferences}>
              Edit Preferences
            </Button>
          </Box>
        )}
      </Box>
      {preferences ? (
        <PersonalizedFeed
          preferences={preferences}
          onOpenPreferencesForm={handleEditPreferences}
        />
      ) : (
        <>
          <p>Please set your preferences to see personalized news.</p>
          <Button variant='outlined' onClick={() => setShowForm(true)}> Set Preferences</Button>
        </>
      )}
      <Dialog open={showForm} onClose={() => setShowForm(false)}>
        <DialogTitle>Set Your Preferences</DialogTitle>
        <DialogContent>
          <Typography variant="body2" display="block" gutterBottom>
            We will remember your preferences next time when you re-visit this
            page.
          </Typography>
          <PreferencesForm onSave={handleSavePreferences} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={showFiltersPopup && isSmallScreen}
        onClose={handleCloseFiltersPopup}
      >
        <DialogTitle>Selected Filters</DialogTitle>
        <DialogContent>
          <Typography variant="body2" display="block" gutterBottom>
            Selected sources, categories, and keywords:
          </Typography>
          <Stack direction="row" spacing={1}>
            {preferences?.sources &&
              preferences.sources.map((source, index) => (
                <Chip key={index} label={source} variant="outlined" />
              ))}
            {preferences?.categories.map((category, index) => (
              <Chip key={index} label={category} variant="outlined" />
            ))}
            {preferences?.keywords &&
              preferences.keywords.map((keyword, index) => (
                <Chip key={index} label={keyword} variant="outlined" />
              ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PreferencesPage;
