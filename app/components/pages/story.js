import { Component, createElement as create, DOM } from 'react';
import { extend } from 'underscore';

import Root from 'components/pages/root';
import Single from 'components/items/story';
import Feed from 'components/items/comments/feed';

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
        create(Single, { story: story }),
        div({ className: 'row' },
          div({ className: 'col s11 offset-s1' },
            create(Feed, {
              lastPage: lastPage,
              maxDepth: maxDepth,
              getCommentsByPage: getCommentsByPage
            }))));

    return tree;
  }
}

Story.propTypes = extend({}, Single.propTypes, Feed.propTypes);

export default Story;
