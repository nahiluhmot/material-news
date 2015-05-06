import { Component, createElement as create, DOM, PropTypes } from 'react';
import { extend } from 'underscore';

import Root from 'components/pages/root';
import Feed from 'components/stories/feed';

const { h4 } = DOM;

/**
 * This class shows the submitted items for an individual user.
 */
class Submissions extends Component {
  /**
   * Create a new Submissions page.
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

Submissions.propTypes = extend({
  username: PropTypes.string.isRequired
}, Feed.propTypes);

export default Submissions;
