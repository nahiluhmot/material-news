import Promise from 'bluebird';
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

/**
 * Test if the argument is an integer greater than one.
 */
const valid = n => (typeof n === 'number') && ((n % 1) === 0) || (n >= 1);

export default (id, depth) =>
  valid(id) ?
    (valid(depth) ?
      recur(id, depth) :
      new Promise((_, reject) => reject(`Invalid depth: ${depth}`))) :
    new Promise((_, reject) => reject(`Invalid ID: ${id}`));
