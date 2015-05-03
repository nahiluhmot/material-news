import { contains } from 'underscore';

/**
 * This file holds validation logic for models.
 */
export default {
  /**
   * Test that the given object is a valid story preview.
   */
  validPreview(story) {
    console.log(story);
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
