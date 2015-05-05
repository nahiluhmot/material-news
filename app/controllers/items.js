import Comment from 'components/pages/comment';
import Story from 'components/pages/story';

import { COMMENT_DEPTH, ITEMS_PER_PAGE } from 'config/constants';

import { findItemById, maxItemId } from 'services/hacker-news';
import loadComments from 'services/load-comments';
import Paginator from 'services/paginator';
import render from 'services/render';
import { validComment } from 'services/validators';

import { navigate } from 'aviator';
import { map } from 'bluebird';
import { filter } from 'underscore';

const paginate = ids => new Paginator(
  ITEMS_PER_PAGE,
  ids.map(id => () => loadComments(id, COMMENT_DEPTH))
);

/**
 * This object contains the routing logic dealing with items.
 */
const Items = {
  /**
   * Lookup an item by its ID. If the item is found, the controller will
   * determine what type of item it is and then render the correct React view.
   * Otherwise, an item-specific 404 page will be rendered.
   */
  show({ namedParams }) {
    const { id } = namedParams;

    findItemById(id).then(item => {
      console.log(item);
      if (typeof item !== 'object') {
        throw new Error(`Expected an Object, got a ${typeof item}: ${item}`);
      } else if (item.type === 'story') {
        this._showStory(item);
      } else if (item.type === 'comment') {
        this._showComment(item);
      } else if (item.type === 'job') {
        // this._showJob(item);
      } else if (item.type === 'poll') {
        // this._showPoll(item);
      } else if (item.type === 'pollopt') {
        // this._showPollOpt(item);
      } else {
        throw new Error(`Unknown item type: ${item.type}`);
      }
    }).catch(error => {
      console.log(`Could not find item with id: ${id}`);
      console.log(error);
    });
  },

  /**
   * Render the latest item created.
   */
  latest({ getCurrentURI: route }) {
    maxItemId().then(id => {
      navigate(`/items/${id}/`);
    }).catch(error => {
      console.log('Could not find latest item');
      console.log(error);
    });
  },

  /**
   * Private helpers.
   */

  _showComment(comment) {
    const pages = paginate(comment.kids || []);

    render(Comment, {
      comment: comment,
      maxDepth: COMMENT_DEPTH,
      getCommentsByPage: page => pages.getPage(page).filter(validComment),
      lastPage: pages.pageCount()
    });
  },

  _showStory(story) {
    const pages = paginate(story.kids || []);

    render(Story, {
      story: story,
      maxDepth: COMMENT_DEPTH,
      getCommentsByPage: page => pages.getPage(page).filter(validComment),
      lastPage: pages.pageCount()
    });
  }
};

export default Items;
