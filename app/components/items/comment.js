import { unix } from 'moment';
import { Component, createElement as create, DOM, PropTypes } from 'react';

const { a, div } = DOM;

/**
 * This class displays a lazy feed of comments.
 */
class Comment extends Component {
  /**
   * Create a new Comment.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the comment.
   */
  render() {
    const { by, id, kids, text, time } = this.props.comment;
    console.log(this.props.comment);

    const tree =
      div({ className: 'comment' },
        div({ className: 'comment-content' },
          div({},
            a({ className: 'navigate comment-link', href: `/users/${by}/` },
              by),
            a({ className: 'navigate comment-link right', href: `/items/${id}/` },
              unix(time).fromNow())),
          div({ dangerouslySetInnerHTML: { __html: text } })));

    return tree;
  }
}


Comment.propTypes = {
  /**
   * This object is the root of the comment tree.
   */
  comment: PropTypes.shape({
    /**
     * Submitting user's username.
     */
    by: PropTypes.string.isRequired,

    /**
     * Unique identifier of the comment whose preview is being shown.
     */
    id: PropTypes.number.isRequired,

    /**
     * Comment body.
     */
    text: PropTypes.string.isRequired,

    /**
     * UTC time of the submission.
     */
    time: PropTypes.number.isRequired
  }).isRequired,
};

export default Comment;
