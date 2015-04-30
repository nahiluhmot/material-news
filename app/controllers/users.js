import { ITEMS_PER_PAGE } from 'config/constants';
import { findUserByUsername, findItemById } from 'requests/hacker-news';
import { navigate } from 'aviator';
import { map } from 'underscore';
import { all } from 'bluebird';

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
  submissions({ namedParams }) {
    const { username } = namedParams;

    findUserByUsername(username).then(user => {
      return all(map(user.submitted.slice(0, ITEMS_PER_PAGE), findItemById));
    }).then(submissions => {
      console.log(`Found submissions by user: ${username}`);
      console.log(submissions);
    }).catch(error => {
      console.log(`Could not find submissions by user: ${username}`);
      console.log(error);
    });
  }
};

export default Users;
