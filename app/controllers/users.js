import { ITEMS_PER_PAGE } from 'config/constants';
import { findUserByUsername, findItemById } from 'services/hacker-news';
import Paginator from 'services/paginator';
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
      console.log(`Found user by username: ${username}`);
      console.log(user);
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
    let { page } = queryParams;

    if ((typeof page !== 'number') || (page < 1)) {
      page = 1;
    }

    findUserByUsername(username).then(user => {
      const paginator =
        new Paginator(ITEMS_PER_PAGE,
          map(user.submitted, itemId => () => findItemById(itemId)));

      return paginator.getPage(page);
    }).then(submissions => {
      console.log(`Found submissions by user ${username} on page ${page}`);
      console.log(submissions);
    }).catch(error => {
      console.log(`Could not find submissions by user ${username}`);
      console.log(error);
    });
  }
};

export default Users;
