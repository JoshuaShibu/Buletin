import axios from 'axios';
import cache from '../utils/cache';
import { filterAndFormatArticles, filterUniqueArticles } from '../utils/articleUtils';

const apiKey = 'a1d3371659f742f8afcfa0f83d659b93';

const cacheKey = (url, params) => `${url}:${JSON.stringify(params)}`;

const getFromCacheOrFetch = async (apiUrl, params) => {
  const key = cacheKey(apiUrl, params);
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log('Cache hit for:', key);
    return cachedResponse;
  }

  console.log('Cache miss for:', key);
  try {
    const response = await axios.get(apiUrl, { params });
    const articles = response.data.articles || [];
    const formattedArticles = filterAndFormatArticles(articles);
    cache.set(key, formattedArticles);
    return formattedArticles;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const getFilteredNews = async ({ keyword, category, source, startDate, endDate }) => {
  const apiUrl = 'https://newsapi.org/v2/top-headlines';
  const params = {
    apiKey,
    q: keyword,
    category,
    sources: source,
    from: startDate,
    to: endDate,
  };

  const articles = await getFromCacheOrFetch(apiUrl, params);
  return filterUniqueArticles(articles);
};

export const getTopHeadlines = async () => {
  const apiUrl = 'https://newsapi.org/v2/top-headlines';
  const params = {
    sources: 'bbc-news',
    apiKey,
  };

  const articles = await getFromCacheOrFetch(apiUrl, params);
  return filterUniqueArticles(articles);
};

export const getTopHeadlinesWithTech = async () => {
  const apiUrl = 'https://newsapi.org/v2/top-headlines';
  const params = {
    category: 'general',
    apiKey,
    country: 'us',
  };

  const articles = await getFromCacheOrFetch(apiUrl, params);
  return filterUniqueArticles(articles);
};

export const getPersonalizedNews = async (preferences) => {
  const apiUrl = 'https://newsapi.org/v2/everything';
  const params = {
    apiKey,
    sources: preferences.sources.join(','),
    q: preferences.keywords && preferences.keywords.join(' OR '),
    category: preferences.categories && preferences.categories.join(','),
  };

  const articles = await getFromCacheOrFetch(apiUrl, params);
  return filterUniqueArticles(articles);
};

export const getNewsSources = async () => {
  const apiUrl = 'https://newsapi.org/v2/top-headlines/sources';
  const params = {
    apiKey,
  };

  const key = cacheKey(apiUrl, params);
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log('Cache hit for:', key);
    return cachedResponse;
  }

  console.log('Cache miss for:', key);
  try {
    const response = await axios.get(apiUrl, { params });
    const sources = response.data.sources || [];
    cache.set(key, sources);
    return sources;
  } catch (error) {
    console.error('Error fetching sources:', error);
    throw new Error('Failed to fetch news sources');
  }
};
