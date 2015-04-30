import Items from 'controllers/items';
import Users from 'controllers/users';

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
  },
  '/users': {
    target: Users,
    '/:username': {
      '/': 'show',
      '/submissions': 'submissions'
    }
  }
};
