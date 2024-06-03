import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getNewsSources } from '../services/newsService';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const SearchFilter = ({ onSearch, reset }) => {
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    source: '',
    startDate: '',
    endDate: ''
  });
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await getNewsSources();
        setSources(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sources:', error);
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  useEffect(() => {
    if (reset) {
      setFilters({
        keyword: '',
        category: '',
        source: '',
        startDate: '',
        endDate: ''
      });
    }
  }, [reset]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: '20px' }}>
      {isMobile ? (
        <>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<FilterListIcon />}
            onClick={handleClickOpen}
          >
            Filters
          </Button>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Filter Options</DialogTitle>
            <DialogContent>
              <TextField
                label="Keyword"
                name="keyword"
                value={filters.keyword}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={filters.category}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="technology">Technology</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="entertainment">Entertainment</MenuItem>
                  <MenuItem value="health">Health</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Source</InputLabel>
                <Select
                  name="source"
                  value={filters.source}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">All</MenuItem>
                  {sources.map(source => (
                    <MenuItem key={source.id} value={source.id}>
                      {source.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={filters.startDate}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={filters.endDate}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => { handleSearch(); handleClose(); }} variant="contained">Search</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <TextField
            label="Keyword"
            name="keyword"
            value={filters.keyword}
            onChange={handleInputChange}
          />
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              sx={{ width: '140px' }}
              name="category"
              value={filters.category}
              onChange={handleInputChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
              <MenuItem value="health">Health</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 140 }}>
            <InputLabel>Source</InputLabel>
            <Select
              name="source"
              value={filters.source}
              onChange={handleInputChange}
            >
              <MenuItem value="">All</MenuItem>
              {sources.map(source => (
                <MenuItem key={source.id} value={source.id}>
                  {source.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={filters.startDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={filters.endDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" onClick={handleSearch}>Search</Button>
        </>
      )}
    </Box>
  );
};

export default SearchFilter;
