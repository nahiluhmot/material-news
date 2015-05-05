import { unix } from 'moment';
import { Component, createElement as create, DOM, PropTypes } from 'react';
import Preview from 'components/stories/preview';

const { a, button, div, span } = DOM;

/**
 * This class displays a story.
 */
class Story extends Component {
  /**
   * Create a new Story.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the story.
   */
  render() {
    const { by, id, score, title, time, text, url } = this.props.story;

    const tree =
      div({ className: 'story' },
        div({ className: 'story-content' },
          div({ className: 'story-title' },
            div({ className: 'story-score' }, score),
            a({ className: 'story-link', href: url || `/items/${id}` },
              title || url)
          ),

          div({
            className: 'story-text',
            dangerouslySetInnerHTML: { __html: text }
          }),

          div({ className: 'story-actions' },
            div({ className: 'story-action' },
              a({ className: 'navigate story-link', href: `/users/${by}/` },
                by)),

            div({ className: 'story-action' },
              a({ className: 'navigate', href: `/items/${id}/` },
                unix(time).fromNow())))));
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
     * Text of an Ask or Show HN, or Poll.
     */
    text: PropTypes.string,

    /**
     * Title of the story.
     */
    title: PropTypes.string.isRequired,

    /**
     * UTC time at which the story was posted.
     */
    time: PropTypes.number.isRequired,

    /**
     * Optional link to the story.
     */
    url: PropTypes.string
  }).isRequired
};

export default Story;
