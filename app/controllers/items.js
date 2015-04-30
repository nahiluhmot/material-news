import { findItemById, maxItemId } from 'requests/hacker-news';
import { navigate } from 'aviator';

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
};

export default Items;
