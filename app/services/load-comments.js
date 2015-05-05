import { map } from 'bluebird';
import { filter, extend } from 'underscore';

import { findItemById } from 'services/hacker-news';
import { validComment } from 'services/validators';

/**
 * Given an item, return a promise that loads all of the comment IDs from the
 * Hacker News API, as well as their children, recursively. The children can be
 * found in the loadedChildren key of the comment.
 */
const recur = (id, depth) =>
  findItemById(id)
    .then(comment =>
      (depth === 1) ?
        comment :
        Promise.map(comment.kids || [], kid => recur(kid, depth - 1))
          .then(children =>
            extend({ loadedChildren: filter(children, validComment) },
             comment)));

export default recur;
