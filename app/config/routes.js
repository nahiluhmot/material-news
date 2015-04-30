import Items from 'controllers/items';
import Root from 'controllers/root';
import Stories from 'controllers/stories';
import Users from 'controllers/users';

/**
 * This file exports the application routes.
 */
export default {
  target: Root,
  '/': 'home',
  '/items': {
    target: Items,
    '/latest': 'latest',
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
