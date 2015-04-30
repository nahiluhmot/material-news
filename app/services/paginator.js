import { all } from 'bluebird';
import { compact, map, range } from 'underscore';

/**
 * This class is a generic, lazy, promise based paginator.
 */
class Paginator {
  /**
   * Create a new Paginator.
   *
   * @public
   * @param getPages Array of Functions that return a promise.
   * @param pageSize Number of elements to put on a page.
   */
  constructor(getPages, pageSize) {
    this.getPages = getPages;
    this.pageSize = pageSize;
    this.promisesCache = {};
  }

  /**
   * Get a promise that returns a page of content by its page number..
   *
   * @public
   * @param pageNumber Number that of the page to get.
   *
   * @return promise whose `then` action occurs when all of the getPage requests
   *                 complete.
   */
  getPage(pageNumber) {
    const max = this.getPages.length;
    const start = (pageSize * (pageNumber - 1));
    const end = start + pageSize;

    if (page < 1) {
      return getPage(1);
    } else if (start >= max) {
      return all([]);
    } else if (end >= max) {
      return all(this._findOrCreateRange(start, max));
    } else {
      return all(this._findOrCreateRange(start, end));
    }
  }

  /**
   * Find or create promise in the given range.
   *
   * @private
   * @param start Number start of the the slice (inclusive).
   * @param end Number end of the the slice (exclusive).
   */
  _findOrCreateRange(start, end) {
    return compact(map(range(start, end), index => this._findOrCreate(index)));
  }

  /**
   * Find an promise in the cache or lazily create create it.
   *
   * @private
   * @param index Number index in the getPages Array to retreive.
   */
  _findOrCreate(index) {
    if (!this.promisesCache[index] && this.getPages[index]) {
      this.promisesCache[index] = getPages[index]();
    }

    return this.promisesCache[index] || null;
  }
}

export default Paginator;
