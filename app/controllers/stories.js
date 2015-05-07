import List from 'components/pages/stories/list';
import { ITEMS_PER_PAGE } from 'config/constants';
import API from 'services/hacker-news';
import render from 'services/render';
import Paginator from 'services/paginator';
import { validStory }  from 'services/validators';
import { navigate } from 'aviator';

/**
 * This object contains the routing logic for loading the stories views.
 */
const Stories = {
  /**
   * Get the top stories -- like hot on reddit.
   */
  top() {
    this._loadPage('top stories', API.topStories());
  },

  /**
   * Get the newest stories.
   */
  recent() {
    this._loadPage('recent stories', API.newStories());
  },

  /**
   * Get the Ask HN stories.
   */
  ask() {
    this._loadPage('ask stories', API.askStories());
  },

  /**
   * Get the Show HN stories.
   */
  show() {
    this._loadPage('ask stories', API.showStories());
  },

  /**
   * Get the Job stories.
   */
  job() {
    this._loadPage('job listings', API.jobStories());
  },

  /**
   * Private helpers.
   */

  _loadPage(type, promise) {
    promise.then(ids => {
      const promises = ids.map(id => () => API.findItemById(id));
      const pages = new Paginator(ITEMS_PER_PAGE, promises);

      render(List, {
        getItemsByPage: page => pages.getPage(page).filter(validStory),
        lastPage: pages.pageCount()
      });
    }).catch(error => {
      navigate('/errors/', {
        queryParams: {
          message: `Unable to load ${type}`
        }
      });
    });
  }
};

export default Stories;
