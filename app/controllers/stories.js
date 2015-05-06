import List from 'components/pages/stories/list';
import { ITEMS_PER_PAGE } from 'config/constants';
import API from 'services/hacker-news';
import render from 'services/render';
import Paginator from 'services/paginator';
import { validStory }  from 'services/validators';
import { navigate } from 'aviator';

const loadPage = (type, promise) => {
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
};

/**
 * This object contains the routing logic for loading the stories views.
 */
const Stories = {
  /**
   * Get the top stories -- like hot on reddit.
   */
  top: () => loadPage('top stories', API.topStories()),

  /**
   * Get the newest stories.
   */
  recent: () => loadPage('recent stories', API.newStories()),

  /**
   * Get the Ask HN stories.
   */
  ask: () => loadPage('ask stories', API.askStories()),

  /**
   * Get the Show HN stories.
   */
  show: () => loadPage('ask stories', API.showStories()),

  /**
   * Get the Job stories.
   */
  job: () => loadPage('job listings', API.jobStories()),
};

export default Stories;
