import reqwest from 'reqwest';

/**
 * This module exports a single function that performs a real (as opposed to a
 * mocked) HTTP request.
 */
export default uri =>
  reqwest({
    method: 'GET',
    url: `https://hacker-news.firebaseio.com/v0/${uri}.json`,
    crossOrigin: true,
    type: 'json',
  });
