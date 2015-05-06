import { COMMENT_DEPTH, ITEMS_PER_PAGE } from 'config/constants';
import Show from 'components/pages/users/show';
import Comments from 'components/pages/users/comments';
import Submissions from 'components/pages/users/submissions';
import { findUserByUsername, findItemById } from 'services/hacker-news';
import { validComment, validStory } from 'services/validators';
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
    }).catch(() => {
      navigate('/errors/', {
        queryParams: {
          message: `No such username: "${username}"`
        }
      });
    });
  },

  /**
   * Retreive the submissions by a user.
   */
  comments({ namedParams, queryParams }) {
    const { username } = namedParams;

    findUserByUsername(username).then(user => {
      const submissions = user.submitted || [];
      const promises = submissions.map(id => () => findItemById(id));
      const pages = new Paginator(ITEMS_PER_PAGE, promises);

      render(Comments, {
        username: username,
        getCommentsByPage: page => pages.getPage(page).filter(validComment),
        lastPage: pages.pageCount(),
        maxDepth: COMMENT_DEPTH
      });
    }).catch(error => {
      navigate('/errors/', {
        queryParams: {
          message: `No such username: "${username}"`
        }
      });
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
      navigate('/errors/', {
        queryParams: {
          message: `No such username: "${username}"`
        }
      });
    });
  }
};

export default Users;
