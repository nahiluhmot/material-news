import { get } from 'axios';

/**
 * This constant is used to perform HTTP GETs against the Hacker News API.
 */
const request = uri => get(`https://hacker-news.firebaseio.com/v0/${uri}.json`);

/**
 * This object is used to asynchronously communicate with the Hacker News API.
 * Each function method in Object class performs an asynchronous request and
 * returns a promise. For the response schemas, See the Hacker News API docs at
 * https://github.com/HackerNews/API.
 */
export default {
  /**
   * Find an item (Story, Job Posting, Ask HN, Comment, Poll, or Poll Option)
   * by its ID.
   */
  findItemById: id => request(`item/${id}`),

  /**
   * Find a user by their username.
   */
  findUserByUsername: username => request(`user/${username}`),

  /**
   * Get the current maximum item ID.
   */
  maxItemId: () => request('maxitem'),

  /**
   * Retreive a list of the item IDs of the new stories.
   */
  newStories: () => request('newstories'),

  /**
   * Retreive a list of the item IDs of the top stories.
   */
  topStories: () => request('topstories'),

  /**
   * Retreive a list of the item IDs of the Ask HN stories.
   */
  askStories: () => request('askstories'),

  /**
   * Retreive a list of the item IDs of the Show HN stories.
   */
  showStories: () => request('showstories'),

  /**
   * Retreive a list of the item IDs of the Job stories.
   */
  jobStories: () => request('jobstories'),

  /**
   * Retreive a list of the item IDs of the recently changed items as well as
   * the recently changed users.
   */
  updates: () => request('updates')
};
