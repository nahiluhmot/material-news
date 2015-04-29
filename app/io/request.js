import reqwest from 'reqwest';

/**
 * This module exports a single function that performs an HTTP GET request to
 * the Hacker News API.
 */
export default uri =>
  reqwest({
    method: 'GET',
    url: `https://hacker-news.firebaseio.com/v0/${uri}.json`,
    crossOrigin: true,
    type: 'json',
  });
