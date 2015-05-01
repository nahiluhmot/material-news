import { Component, createElement as create, DOM } from 'react';

import Root from 'components/pages/root';
import Feed from 'components/stories/feed';

/**
 * This class is used to show the previews of the top stories.
 */
class Stories extends Component {
  /**
   * Create a new Stories page.
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

Stories.propTypes = Feed.propTypes;

export default Stories;
