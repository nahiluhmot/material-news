import { Component, createElement as create, DOM } from 'react';

import Root from 'components/pages/root';
import Feed from 'components/stories/feed';

/**
 * This class is used to show the previews of the top stories.
 */
class Top extends Component {
  /**
   * Create a new Top page.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const tree =
      create(Root, {},
        create(Feed, this.props));

    return tree;
  }
}

Top.propTypes = Feed.propTypes;

export default Top;
