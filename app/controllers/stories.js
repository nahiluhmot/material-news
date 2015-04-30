import Top from 'components/pages/stories/top';
import { ITEMS_PER_PAGE } from 'config/constants';

import API from 'requests/hacker-news';

import render from 'services/render';
import Paginator from 'services/paginator';

import { navigate } from 'aviator';

const loadPage = (name, promise, page) => {
  if ((typeof page !== 'number') || (page < 1)) {
    page = 1;
  }
  page = Math.ceil(page);

  promise.then(ids => {
    const toLoad = ids.map(id => () => API.findItemById(id));
    const paginator = new Paginator(ITEMS_PER_PAGE, toLoad);
    return paginator.getPage(0);
  }).then(page => {
    console.log(`Loaded the ${name} stories`);
    console.log(page);
  }).catch(error => {
    console.log(`Unable to load the ${name} stories`);
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
  top: () => {
    API.topStories().then(ids => {
      const promises = ids.map(id => () => API.findItemById(id));
      const pages = new Paginator(ITEMS_PER_PAGE, promises);

      render(Top, {
        getItemsByPage: page => pages.getPage(page),
        lastPage: pages.pageCount()
      });
    }).catch(error => {
      console.log('Unable to fetch the top stories');
      console.log(error);
    });
  },

  /**
   * Get the newest stories.
   */
  recent: ({ queryParams }) =>
    loadPage('new', API.newStories(), queryParams.page),
  /**
   * Get the Ask HN stories.
   */
  ask: ({ queryParams }) =>
    loadPage('ask', API.askStories(), queryParams.page),
  /**
   * Get the Show HN stories.
   */
  show: ({ queryParams }) =>
    loadPage('show', API.showStories(), queryParams.page),
  /**
   * Get the Job stories.
   */
  job: ({ queryParams }) =>
    loadPage('job', API.jobStories(), queryParams.page)
};

export default Stories;
