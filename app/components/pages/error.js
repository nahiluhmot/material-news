import Root from 'components/pages/root';

import { Component, createElement as create, DOM, PropTypes } from 'react';

const { a, div, h4 } = DOM;

/**
 * This page is used to render errors for the user.
 */
class ErrorPage extends Component {
  /**
   * Create a new error page.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the error page.
   */
  render() {
    const { message, lastPage } = this.props;
    const tree =
      create(Root, {},
        div({ className: 'row' },
          h4({ className: 'center-align header' },
            message)),

        div({ className: 'row' },
          a({ className: 'error-home-button', href: '/' },
            'Home')));

    return tree;
  }
}

ErrorPage.propTypes = {
  /**
   * Required error message.
   */
  message: PropTypes.string.isRequired,
};

export default ErrorPage;
