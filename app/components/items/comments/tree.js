import { Component, createElement as create, DOM, PropTypes } from 'react';
import Comment from 'components/items/comment';

const { a, div } = DOM;

/**
 * This class displays a lazy feed of comments.
 */
class CommentTree extends Component {
  /**
   * Create a new CommentTree.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the tree.
   */
  render() {
    const { root, maxDepth, currentDepth } = this.props;
    const { by, id, loadedChildren, kids, text, time } = root;
    const size = 12 - currentDepth;

    const tree =
      div({},
        // Render the current comment.
        div({ className: 'row' },
          // Offset the comment tree by its depth.
          div({ className: `col s${size} offset-s${currentDepth}` },
            create(Comment, { comment: root }),

            // Render the "Load more" button when there are too many.
            ((maxDepth > (currentDepth + 1) || ((kids || []).length === 0)) ?
              null :
              a({ className: 'comment-tree-button', href: `/items/${id}/` },
                `${(kids || []).length} more comments`)))),

        // Render the children.
        ((maxDepth > (currentDepth + 1)) ?
          [] :
          (loadedChildren || []).map(child => create(CommentTree, {
            root: child,
            currentDepth: currentDepth + 1,
            maxDepth: maxDepth,
            key: child.id
          }))));

    return tree;
  }
}

CommentTree.propTypes = {
  /**
   * This object is the root of the comment tree.
   */
  root: PropTypes.shape({
    /**
     * Submitting user's username.
     */
    by: PropTypes.string.isRequired,

    /**
     * Unique identifier of the comment whose preview is being shown.
     */
    id: PropTypes.number.isRequired,

    /**
     * Forest of chidlren comments.
     */
    loadedChildren: PropTypes.array.isRequired,

    /**
     * Array of IDs that link to comments.
     */
    kids: PropTypes.array,

    /**
     * Comment body.
     */
    text: PropTypes.string.isRequired,

    /**
     * UTC time of the submission.
     */
    time: PropTypes.number.isRequired
  }).isRequired,

  /**
   * Current depth of the comment tree.
   */
  currentDepth: PropTypes.number.isRequired,

  /**
   * Max depth of the comment tree.
   */
  maxDepth: PropTypes.number.isRequired
};

export default CommentTree;
