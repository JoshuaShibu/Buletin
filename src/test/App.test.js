// src/components/App.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import * as newsService from '../services/newsService';

jest.mock('../services/newsService');

describe('App Component', () => {
  const mockArticles = [
    { title: 'Article 1', image: 'image1.jpg', publishedAt: '2024-06-01', content: 'Content 1', description: 'Description 1', author: 'Author 1', url: 'https://article1.com' },
    { title: 'Article 2', image: 'image2.jpg', publishedAt: '2024-06-02', content: 'Content 2', description: 'Description 2', author: 'Author 2', url: 'https://article2.com' },
  ];

  beforeEach(() => {
    newsService.getTopHeadlines.mockResolvedValue(mockArticles);
    newsService.getFilteredNews.mockResolvedValue(mockArticles);
  });

  test('renders App component', () => {
    render(<App />);
    const linkElement = screen.getByText(/My Feed/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders the Header component', () => {
    render(
        <App />
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('shows loading spinner initially', () => {
    render(<App />);
    expect(screen.getByTestId('app-main-loader')).toBeInTheDocument();
  });

  test('navigates to the Preferences page', () => {
    render(<App />);
    const myFeedBtn = screen.getByText(/My Feed/i);
    fireEvent.click(myFeedBtn);
    expect(screen.getByText(/Your Personalized Feed/i)).toBeInTheDocument();
  });
});



