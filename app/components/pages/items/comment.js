import { Component, createElement as create, DOM } from 'react';
import { extend } from 'underscore';

import Root from 'components/pages/root';
import Show from 'components/comments/show';
import Feed from 'components/comments/feed';

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
        create(Show, { comment: this.props.comment }),
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

Comment.propTypes = extend({}, Show.propTypes, Feed.propTypes);

export default Comment;
