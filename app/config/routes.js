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
    '/:id': 'show'
  },
  '/stories': {
    target: Stories,
    '/ask': 'ask',
    '/job': 'job',
    '/new': 'recent',
    '/show': 'show',
    '/top': 'top'
  },
  '/users': {
    target: Users,
    '/:username': {
      '/': 'show',
      '/comments': 'comments',
      '/submissions': 'submissions'
    }
  }
};
