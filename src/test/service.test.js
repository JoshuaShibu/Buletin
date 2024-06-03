// src/services/newsService.test.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getFilteredNews, getTopHeadlines, getTopHeadlinesWithTech, getPersonalizedNews, getNewsSources } from './newsService';
import cache from '../utils/cache';

const mock = new MockAdapter(axios);

describe('News Service', () => {
  beforeEach(() => {
    mock.reset();
    cache.clear();
  });

  describe('getFilteredNews', () => {
    it('should fetch filtered news and return unique articles', async () => {
      const filters = { keyword: 'technology', category: 'tech', source: 'bbc-news', startDate: '2022-01-01', endDate: '2022-01-31' };
      const mockResponse = {
        articles: [
          { title: 'Title1', description: 'Description1', urlToImage: 'Image1' },
          { title: 'Title2', description: 'Description2', urlToImage: 'Image2' },
          { title: 'Title2', description: 'Description2', urlToImage: 'Image2' }, // Duplicate
        ]
      };

      mock.onGet('https://newsapi.org/v2/top-headlines').reply(200, mockResponse);

      const result = await getFilteredNews(filters);

      expect(result).toEqual([
        { title: 'Title1', description: 'Description1', image: 'Image1', urlToImage: 'Image1' },
        { title: 'Title2', description: 'Description2', image: 'Image2', urlToImage: 'Image2' }
      ]);
    });

    it('should return empty array on error', async () => {
      const filters = { keyword: 'technology', category: 'tech', source: 'bbc-news', startDate: '2022-01-01', endDate: '2022-01-31' };

      mock.onGet('https://newsapi.org/v2/top-headlines').reply(500);

      const result = await getFilteredNews(filters);

      expect(result).toEqual([]);
    });
  });

  describe('getTopHeadlines', () => {
    it('should fetch top headlines and return unique articles', async () => {
      const mockResponse = {
        articles: [
          { title: 'Title1', description: 'Description1', urlToImage: 'Image1' },
          { title: 'Title2', description: 'Description2', urlToImage: 'Image2' },
          { title: 'Title2', description: 'Description2', urlToImage: 'Image2' }, // Duplicate
        ]
      };

      mock.onGet('https://newsapi.org/v2/top-headlines').reply(200, mockResponse);

      const result = await getTopHeadlines();

      expect(result).toEqual([
        { title: 'Title1', description: 'Description1', image: 'Image1', urlToImage: 'Image1' },
        { title: 'Title2', description: 'Description2', image: 'Image2', urlToImage: 'Image2' }
      ]);
    });

    it('should return empty array on error', async () => {
      mock.onGet('https://newsapi.org/v2/top-headlines').reply(500);

      const result = await getTopHeadlines();

      expect(result).toEqual([]);
    });
  });

  describe('getTopHeadlinesWithTech', () => {
    it('should fetch top headlines with tech and return unique articles', async () => {
      const mockResponse = {
        articles: [
          { title: 'Title1', description: 'Description1', urlToImage: 'Image1' },
          { title: 'Title2', description: 'Description2', urlToImage: 'Image2' },
          { title: 'Title2', description: 'Description2', urlToImage: 'Image2' }, // Duplicate
        ]
      };

      mock.onGet('https://newsapi.org/v2/top-headlines').reply(200, mockResponse);

      const result = await getTopHeadlinesWithTech();

      expect(result).toEqual([
        { title: 'Title1', description: 'Description1', image: 'Image1', urlToImage: 'Image1' },
        { title: 'Title2', description: 'Description2', image: 'Image2', urlToImage: 'Image2' }
      ]);
    });

    it('should return empty array on error', async () => {
      mock.onGet('https://newsapi.org/v2/top-headlines').reply(500);

      const result = await getTopHeadlinesWithTech();

      expect(result).toEqual([]);
    });
  });

  describe('getPersonalizedNews', () => {
    it('should fetch personalized news and return unique articles', async () => {
      const preferences = {
        sources: ['bbc-news'],
        keywords: ['technology'],
        categories: ['tech']
      };
      const mockResponse = {
        articles: [
          { title: 'Title1', description: 'Description1', urlToImage: 'Image1' },
          { title: 'Title2', description: 'Description2', urlToImage: 'Image2' },
          { title: 'Title2', description: 'Description2', urlToImage: 'Image2' }, // Duplicate
        ]
      };

      mock.onGet('https://newsapi.org/v2/everything').reply(200, mockResponse);

      const result = await getPersonalizedNews(preferences);

      expect(result).toEqual([
        { title: 'Title1', description: 'Description1', image: 'Image1', urlToImage: 'Image1' },
        { title: 'Title2', description: 'Description2', image: 'Image2', urlToImage: 'Image2' }
      ]);
    });

    it('should return empty array on error', async () => {
      const preferences = {
        sources: ['bbc-news'],
        keywords: ['technology'],
        categories: ['tech']
      };

      mock.onGet('https://newsapi.org/v2/everything').reply(500);

      const result = await getPersonalizedNews(preferences);

      expect(result).toEqual([]);
    });
  });

  describe('getNewsSources', () => {
    it('should fetch news sources', async () => {
      const mockResponse = {
        sources: [
          { id: 'bbc-news', name: 'BBC News' },
          { id: 'cnn', name: 'CNN' },
        ]
      };

      mock.onGet('https://newsapi.org/v2/top-headlines/sources').reply(200, mockResponse);

      const result = await getNewsSources();

      expect(result).toEqual([
        { id: 'bbc-news', name: 'BBC News' },
        { id: 'cnn', name: 'CNN' }
      ]);
    });

    it('should return empty array on error', async () => {
      mock.onGet('https://newsapi.org/v2/top-headlines/sources').reply(500);

      const result = await getNewsSources();

      expect(result).toEqual([]);
    });
  });
});
