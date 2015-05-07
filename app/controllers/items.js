import Comment from 'components/pages/items/comment';
import Story from 'components/pages/items/story';

import { COMMENT_DEPTH, ITEMS_PER_PAGE } from 'config/constants';

import { findItemById, maxItemId } from 'services/hacker-news';
import loadComments from 'services/load-comments';
import Paginator from 'services/paginator';
import render from 'services/render';
import { validComment } from 'services/validators';

import { navigate } from 'aviator';

/**
 * This object contains the routing logic dealing with items.
 */
const Items = {
  /**
   * Object whose keys are Hacker News item subtypes, and values are their
   * corresponding react views.
   */
  viewMappings: {
    comment: Comment,
    story: Story
  },

  /**
   * Lookup an item by its ID. If the item is found, the controller will
   * determine what type of item it is and then render the correct React view.
   * Otherwise, an item-specific 404 page will be rendered.
   */
  show({ namedParams }) {
    const { id } = namedParams;

    findItemById(id).then(item => {
      if (typeof item !== 'object') {
        throw new Error(`Expected an Object, got a ${typeof item}: ${item}`);
      }

      const pages = new Paginator(
        ITEMS_PER_PAGE,
        (item.kids || []).map(kid => () => loadComments(kid, COMMENT_DEPTH))
      );
      const view = this.viewMappings[item.type];

      if (!view) {
        throw new Error(`Invalid item type: ${item.type}`);
      }

      return render(view, {
        [item.type]: item,
        maxDepth: COMMENT_DEPTH,
        getCommentsByPage: page => pages.getPage(page).filter(validComment),
        lastPage: pages.pageCount()
      });
    }).catch(error => {
      navigate('/errors/', {
        queryParams: {
          message: [
            'Unable to find item',
            (id ? ` with ID ${id}` : ', no ID given')
          ].join('')
        }
      });
    });
  }
};

export default Items;
