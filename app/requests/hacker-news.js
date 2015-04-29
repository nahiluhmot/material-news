/**
 * This class is used to asynchronously communicate with the Hacker News API.
 * Each instance method in class class returns a promise so that the requests
 * are asynchronous. For the response schemas, See the Hacker News API docs at
 * https://github.com/HackerNews/API.
 */
class HackerNews {
  /**
   * The constructor for this object accepts a request function, which is
   * intended to perform an HTTP request. Using this pattern makes stubbing the
   * requests out simpler for testing. The request function should accept a
   * String (for the URI), asynchronously make a request to the specified URI,
   * and return a promise object.
   */
  constructor(request) {
    this._request = request;
  }

  /**
   * Find an item (Story, Job Posting, Ask HN, Comment, Poll, or Poll Option)
   * by its ID.
   */
  findItemById(id) {
    return this._request(`item/${id}`);
  }

  /**
   * Find a user by their username.
   */
  findUserByUsername(username) {
    return this._request(`user/${username}`);
  }

  /**
   * Get the current maximum item ID.
   */
  maxItemId() {
    return this._request('maxitem');
  }

  /**
   * Retreive a list of the item IDs of the new stories.
   */
  newStories() {
    return this._request('newstories');
  }

  /**
   * Retreive a list of the item IDs of the top stories.
   */
  topStories() {
    return this._request('topstories');
  }

  /**
   * Retreive a list of the item IDs of the Ask HN stories.
   */
  askStories() {
    return this._request('askstories');
  }

  /**
   * Retreive a list of the item IDs of the Show HN stories.
   */
  showStories() {
    return this._request('showstories');
  }

  /**
   * Retreive a list of the item IDs of the Job stories.
   */
  jobStories() {
    return this._request('jobstories');
  }

  /**
   * Retreive a list of the item IDs of the recently changed items as well as
   * the recently changed users.
   */
  updates() {
    return this._request('updates');
  }
}

export default HackerNews;
