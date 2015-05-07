import { Component, createElement as create, DOM, PropTypes } from 'react';
import CommentTree from 'components/comments/tree';

const { button, div, span } = DOM;

/**
 * This class displays a lazy feed of comments.
 */
class CommentFeed extends Component {
  /**
   * Create a new CommentFeed.
   */
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      error: null,
      comments: [],
      loading: false
    };
  }

  /**
   * After the component renders for the first time, load the next page.
   */
  componentDidMount() {
    this.loadNextPage();
  }

  /**
   * Render the feed.
   */
  render() {
    const { lastPage, maxDepth } = this.props;
    const { currentPage, error, comments, loading } = this.state;

    const tree =
      div({ className: 'feed' },
        div({ className: 'feed-body' },
          this.state.comments.map((comment, index) =>
            div({ key: comment.id, className: 'feed-item' },
              create(CommentTree, {
                root: comment,
                maxDepth: maxDepth,
                currentDepth: 0
              })))),
              div({ className: 'feed-footer' },
                (error ?
                  div({ className: 'feed-error' }, error) :
                  (loading ?
                    div({ className: 'feed-progress' },
                      div({ className: 'feed-loading' })) :
                        button({
                        className: 'feed-load-button',
                        disabled: loading || (currentPage === lastPage),
                        onClick: event => {
                          event.preventDefault();
                          this.loadNextPage();
                        }
                      }, 'Load More')))));

    return tree;
  }

  /**
   * Attempt to load the next page.
   */
  loadNextPage() {
    const nextPage = this.state.currentPage + 1;

    if (this.state.loading || (nextPage > this.props.lastPage)) {
      return;
    }

    this.setState({ loading: true }, () => {
      this.props.getCommentsByPage(nextPage).then(comments => {
        if (comments.length === 0) {
          this.setState({
            currentPage: nextPage,
            loading: false,
            error: null,
          }, () => this.loadNextPage());
        } else {
          this.setState({
            currentPage: nextPage,
            loading: false,
            comments: this.state.comments.concat(comments),
            error: null
          });
        }
      }).catch(() => {
        this.setState({
          loading: false,
          error: `Unable to load page ${nextPage}, please try again`
        });
      });
    });
  }
}

CommentFeed.propTypes = {
  /**
   * Function that accepts a page number and returns a promise that retrieves
   * all of the comments on that page.
   */
  getCommentsByPage: PropTypes.func.isRequired,

  /**
   * Integer representing the index of the final page.
   */
  lastPage: PropTypes.number.isRequired,

  /**
   * Maximum comment depth to show.
   */
  maxDepth: PropTypes.number.isRequired
};

export default CommentFeed;
