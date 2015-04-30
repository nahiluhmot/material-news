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

    findItemById(id)
      .then(item => console.log(item))
      .catch(() =>
        navigate('/items/not-found/', {
          queryParams: {
            id: id
          }
        }));
  },

  /**
   * Render the latest item created.
   */
  latest({ getCurrentURI: route }) {
    maxItemId()
      .then(id => navigate(`/items/${id}/`))
      .catch(() =>
        navigate('/items/error/', {
          queryParams: {
            route: route,
            message: 'Hacker News API call failed'
          }
        }));
  },

  /**
   * Render a page that says that an item with a specific ID cannot be found.
   */
  notFound({ queryParams }) {
    const { id }  = queryParams;

    console.log(`Could not find item with id: ${id}`);
  },

  /**
   * Display an application error that can't be handled.
   */
  error({ queryParams }) {
    const { route, message } = queryParams;

    if (message) {
      console.log(`Unable to render ${route}, message: ${message}`);
    } else {
      console.log(`Unable to render ${route}`);
    }
  }
};

export default Items;
