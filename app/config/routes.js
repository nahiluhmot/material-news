import Items from 'controllers/items';

/**
 * This file exports the application routes.
 */
export default {
  '/items': {
    target: Items,
    '/latest': 'latest',
    '/not-found': 'notFound',
    '/error': 'error',
    '/:id': 'show'
  }
};
