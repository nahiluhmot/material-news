import Items from 'controllers/items';
import Stories from 'controllers/stories';
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
  '/stories': {
    target: Stories,
    '/top': 'top',
    '/new': 'recent',
    '/ask': 'ask',
    '/show': 'show',
    '/job': 'job'
  },
  '/users': {
    target: Users,
    '/:username': {
      '/': 'show',
      '/submissions': 'submissions'
    }
  }
};
