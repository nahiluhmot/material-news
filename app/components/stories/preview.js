import { unix } from 'moment';
import { Component, DOM, PropTypes } from 'react';

const { a, div, span } = DOM;

/**
 * This class contains the presentation logic for a story.
 */
class Preview extends Component {
  /**
   * Create a new Preview.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the Preview.
   */
  render() {
    const { index, item } = this.props;
    const { by, descendants, id, score, time, title, url } = item;

    const tree =
      div({ key: id, className: 'item-preview' },
        div({ className: 'item-preview-content' },
          span({ className: 'item-preview-title' },
            index,
            '. ',
            a({
              className: url ? '' : 'navigate',
              href: url ? url : `/items/${id}/`
            }, title))),
        div({ className: 'item-preview-action' },
          `${score} points by `,
          a({ className: 'navigate', href: `/users/${by}/` }, by),
          ' ',
          unix(time).fromNow(),
          ' ',
          a({ className: 'navigate', href: `/items/${id}/` },
            (descendants === 0) ? 'discuss' : `${descendants} comemnts`)));

    return tree;
  }
}

Preview.propTypes = {
  /**
   * Object that represents the item being displayed.
   */
  item: PropTypes.shape({
    /**
     * Submitting user's username.
     */
    by: PropTypes.string.isRequired,

    /**
     * Number of children, grandchildren, etc.
     */
    descendants: PropTypes.number.isRequired,

    /**
     * Unique identifier of the item whose preview is being shown.
     */
    id: PropTypes.number.isRequired,

    /**
     * Score of the item.
     */
    score: PropTypes.number.isRequired,

    /**
     * Title of the item.
     */
    title: PropTypes.string.isRequired,

    /**
     * UTC time of the submission.
     */
    time: PropTypes.number.isRequired,

    /**
     * Link to the submitted content. If this property is falsey, a link to the
     * item will be used instead.
     */
    url: PropTypes.string
  }).isRequired,

  /**
   * Index of the preview in the page.
   */
  index: PropTypes.number.isRequired
};

export default Preview;
