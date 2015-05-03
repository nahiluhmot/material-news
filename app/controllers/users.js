import { ITEMS_PER_PAGE } from 'config/constants';
import Show from 'components/pages/user';
import Submissions from 'components/pages/submissions';
import { findUserByUsername, findItemById } from 'services/hacker-news';
import { validStory } from 'services/validators';
import Paginator from 'services/paginator';
import render from 'services/render';
import { navigate } from 'aviator';
import { map } from 'underscore';

/**
 * This object contains the routing logic for pages related to the user.
 */
const Users = {
  /**
   * Show the user's profile page. In that case that the username cannot be
   * found, a message will be displayed.
   */
  show({ namedParams }) {
    const { username } = namedParams;

    findUserByUsername(username).then(user => {
      render(Show, { user: user });
    }).catch(error => {
      console.log(`Unable to find user by username: ${username}`);
      console.log(error);
    });
  },

  /**
   * Retreive the submissions by a user.
   */
  submissions({ namedParams, queryParams }) {
    const { username } = namedParams;

    findUserByUsername(username).then(user => {
      const submissions = user.submitted || [];
      const promises = submissions.map(id => () => findItemById(id));
      const pages = new Paginator(ITEMS_PER_PAGE, promises);

      render(Submissions, {
        username: username,
        getItemsByPage: page => pages.getPage(page).filter(validStory),
        lastPage: pages.pageCount()
      });
    }).catch(error => {
      console.log(`Could not find submissions by user ${username}`);
      console.log(error);
    });
  }
};

export default Users;
