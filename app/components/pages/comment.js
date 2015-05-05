import { Component, createElement as create, DOM } from 'react';
import { extend } from 'underscore';

import Root from 'components/pages/root';
import Single from 'components/items/comment';
import Feed from 'components/items/comments/feed';

const { div } = DOM;

/**
 * This class is used to show a single comment and its children.
 */
class Comment extends Component {
  /**
   * Create a new comment page.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const { comment, getCommentsByPage, lastPage, maxDepth } = this.props;

    const tree =
      create(Root, {},
        create(Single, { comment: this.props.comment }),
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

Comment.propTypes = extend({}, Single.propTypes, Feed.propTypes);

export default Comment;
