import View from 'components/pages/stories';
import { ITEMS_PER_PAGE } from 'config/constants';
import API from 'services/hacker-news';
import render from 'services/render';
import Paginator from 'services/paginator';
import { navigate } from 'aviator';

const loadPage = promise => {
  promise.then(ids => {
    const promises = ids.map(id => () => API.findItemById(id));
    const pages = new Paginator(ITEMS_PER_PAGE, promises);

    render(View, {
      getItemsByPage: page => pages.getPage(page),
      lastPage: pages.pageCount()
    });
  }).catch(error => {
    console.log('Unable to fetch the stories');
    console.log(error);
  });
};

/**
 * This object contains the routing logic for loading the stories views.
 */
const Stories = {
  /**
   * Get the top stories -- like hot on reddit.
   */
  top: () => loadPage(API.topStories()),

  /**
   * Get the newest stories.
   */
  recent: () => loadPage(API.newStories()),

  /**
   * Get the Ask HN stories.
   */
  ask: () => loadPage(API.askStories()),

  /**
   * Get the Show HN stories.
   */
  show: () => loadPage(API.showStories()),

  /**
   * Get the Job stories.
   */
  job: () => loadPage(API.jobStories()),
};

export default Stories;
