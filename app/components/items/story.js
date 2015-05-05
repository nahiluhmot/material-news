import { Component, createElement as create, DOM, PropTypes } from 'react';
import Preview from 'components/stories/preview';

const { button, div, span } = DOM;

/**
 * This class displays a lazy feed of items.
 */
class Story extends Component {
  /**
   * Create a new Story.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the feed.
   */
  render() {
    const { lastPage } = this.props;
    const tree = null;
    return tree;
  }
}

Story.propTypes = {
  /**
   * Object that represents the story being displayed.
   */
  story: PropTypes.shape({
    /**
     * String that represents the posting user.
     */
    by: PropTypes.string.isRequired,

    /**
     * Unique identifier of the story.
     */
    id: PropTypes.number.isRequired,

    /**
     * Integer score.
     */
    score: PropTypes.number.isRequired,

    /**
     * UTC time at which the story was posted.
     */
    time: PropTypes.number.isRequired,

    /**
     * Optional link to the story.
     */
    url: PropTypes.string
  }).isRequired,

  /**
   * Function that accepts a page number and returns a promise that retrieves
   * all of the comments on that page.
   */
  getItemsByPage: PropTypes.func.isRequired,

  /**
   * Integer representing the index of the final page.
   */
  lastPage: PropTypes.number.isRequired
};

export default Story;
