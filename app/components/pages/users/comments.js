import { Component, createElement as create, DOM, PropTypes } from 'react';
import { extend } from 'underscore';

import Root from 'components/pages/root';
import Feed from 'components/comments/feed';

const { h4 } = DOM;

/**
 * This class shows the comments for an individual user.
 */
class Comments extends Component {
  /**
   * Create a new Comments page.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const { username } = this.props;

    const tree =
      create(Root, {},
        h4({ className: 'center-align header' }, username),
        create(Feed, this.props));

    return tree;
  }
}

Comments.propTypes = extend({
  username: PropTypes.string.isRequired
}, Feed.propTypes);

export default Comments;
