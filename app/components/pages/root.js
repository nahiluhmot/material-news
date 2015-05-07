import $ from 'jquery';
import { Component, DOM, PropTypes } from 'react';

const { a, div, i, li, nav, ul } = DOM;

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

  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  /**
   * Render the Root page.
   */
  render() {
    const tree =
      div({},
        div({ className: 'navbar-fixed' },
          nav({},
            div({ className: 'nav-wrapper container' },
              a({ className: 'navigate brand-logo', href: '/' },
                'Hacker News'),
              a({
                href: '#',
                'data-activates': 'root-mobile-nav',
                className: 'button-collapse'
              }, i({ className: 'mdi-navigation-menu' })),
              ul({ className: 'side-nav', id: 'root-mobile-nav' },
                li({},
                  a({ href: '/stories/top/' },
                    'Top')),
                li({},
                  a({ href: '/stories/new/' },
                    'New')),
                li({},
                  a({ href: '/stories/ask/' },
                    'Ask')),
                li({},
                  a({ href: '/stories/show/' },
                    'Show')),
                li({},
                  a({ href: '/stories/job/' },
                    'Job'))),
              ul({ className: 'right hide-on-med-and-down' },
                li({},
                  a({ className: 'navigate', href: '/stories/top/' },
                    'Top')),
                li({},
                  a({ className: 'navigate', href: '/stories/new/' },
                    'New')),
                li({},
                  a({ className: 'navigate', href: '/stories/ask/' },
                    'Ask')),
                li({},
                  a({ className: 'navigate', href: '/stories/show/' },
                    'Show')),
                li({},
                  a({ className: 'navigate', href: '/stories/job/' },
                    'Job')))))),
        div({ className: 'root-container' },
          this.props.children));

    return tree;
  }
}

export default Root;
