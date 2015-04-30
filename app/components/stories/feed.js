import { Component, createElement as create, DOM, PropTypes } from 'react';
import Preview from 'components/stories/preview';

/**
 * This class displays a lazy feed of items.
 */
class Feed extends Component {
  /**
   * Create a new Feed.
   */
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      error: null,
      items: [],
      loading: false
    };
  }

  /**
   * After the component renders for the first time, load the next page.
   */
  componentDidMount() {
    loadNextPage();
  }

  /**
   * Render the feed.
   */
  render() {
    const { lastPage } = this.props;
    const { currentPage, error, items, loading } = this.state;

    const tree =
      div({ className: 'feed' },
        div({ className: 'feed-body' },
          this.state.items.map(item =>
            div({ className: 'feed-item' },
              create(Preview, { item: item })))),
        div({ className: 'feed-footer' },
          (error ?
            div({ className: 'feed-error' }, error) :
            (loading ?
              span({ className: 'feed-loading' }) :
              button({
                className: 'feed-load-button',
                disabled: loading || (currentPage === lastPage),
                onClick: event => {
                  event.prevetDefault();
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
      getItemsByPage(nextPage).then(items => {
        this.setState({
          currentPage: nextPage,
          loading: false,
          items: this.state.items.concat(items),
          error: null
        });
      }).catch(error => {
        console.log(`Error loading page ${nextPage}`);
        console.log(error);
        this.setState({
          loading: false,
          error: `Unable to load page ${nextPage}, please try again`
        });
      });
    });
  }
}

Feed.propTypes = {
  /**
   * Function that accepts a page number and returns a promise that retrieves
   * all of the items on that page.
   */
  getItemsByPage: PropTypes.func.isRequired,
  /**
   * Integer representing the index of the final page.
   */
  lastPage: PropTypes.number.isRequired
};

export default Feed;
