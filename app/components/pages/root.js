import { Component, DOM, PropTypes } from 'react';

const { a, div, span } = DOM;

/**
 * This class is the container into which the rest of the application is
 * rendered.
 */
class Root extends Component {
  /**
   * Create a new Root page.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the Root page.
   */
  render() {
    const tree =
      div({ className: 'root-container' }, this.props.children);

    return tree;
  }
}

export default Root;
