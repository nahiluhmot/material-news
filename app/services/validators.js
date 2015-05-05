import { contains } from 'underscore';

/**
 * This file holds validation logic for models.
 */
export default {
  /**
   * Test that the given object is a valid comment.
   */
  validComment(comment) {
    return (typeof comment === 'object') &&
      !comment.deleted &&

      (typeof comment.by === 'string') &&
      (comment.by !== '') &&

      (typeof comment.id === 'number') &&
      (comment.id >= 1) &&
      ((comment.id % 1) === 0) &&

      (typeof comment.parent === 'number') &&

      (typeof comment.text === 'string') &&
      (comment.text !== '') &&

      (typeof comment.time === 'number') &&
      (comment.time >= 0) &&
      ((comment.time % 1) === 0) &&

      (comment.type === 'comment');
  },

  /**
   * Test that the given object is a valid story.
   */
  validStory(story) {
    return (typeof story === 'object') &&
      !story.deleted &&

      (typeof story.by === 'string') &&
      (story.by !== '') &&

      (typeof story.id === 'number') &&
      (story.id >= 1) &&
      ((story.id % 1) === 0) &&

      (typeof story.time === 'number') &&
      (story.time >= 0) &&
      ((story.time % 1) === 0) &&

      (typeof story.score === 'number') &&
      ((story.score % 1) === 0) &&

      (typeof story.title === 'string') &&
      (story.title !== '') &&

      (contains(['job', 'poll', 'story'], story.type));
  }
};
