import { Component, createElement as create, DOM } from 'react';
import { extend } from 'underscore';

import Root from 'components/pages/root';
import Show from 'components/stories/show';
import Feed from 'components/comments/feed';

const { div } = DOM;

/**
 * This class is used to show a single comment and its children.
 */
class Story extends Component {
  /**
   * Create a new comment page.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const { story, getCommentsByPage, lastPage, maxDepth } = this.props;

    const tree =
      create(Root, {},
        create(Show, { story: story }),
        create(Feed, {
          lastPage: lastPage,
          maxDepth: maxDepth,
          getCommentsByPage: getCommentsByPage
        }));

    return tree;
  }
}

Story.propTypes = extend({}, Show.propTypes, Feed.propTypes);

export default Story;
