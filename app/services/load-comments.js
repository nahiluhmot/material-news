import { map } from 'bluebird';
import { compact, extend } from 'underscore';

import { findItemById } from 'services/hacker-news';
import { validComment } from 'services/validators';

/**
 * Given an item, return a promise that loads all of the comment IDs from the
 * Hacker News API, as well as their children, recursively. The children can be
 * found in the loadedChildren key of the comment.
 */
const recur = item =>
  map(item.kids || [], id => findItemById(id).catch(() => null))
    .then(compact)
    .filter(validComment)
    .map(comment =>
      recur(comment)
        .then(children =>
          extend({ loadedChildren: children }, comment)));

export default recur;
