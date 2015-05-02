import { unix } from 'moment';
import { Component, DOM, PropTypes } from 'react';

const { a, h4, div, span } = DOM;

/**
 * This class contains the presentation logic for a user profiles.
 */
class Profile extends Component {
  /**
   * Create a new Profile.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the Profile.
   */
  render() {
    const { about, created, id, karma } = this.props.user;

    const tree =
      div({},
        div({ className: 'row' },
          h4({ className: 'center-align header' }, id)),
        div({ className: 'row' },
          div({ className: 'profile-label col s2 m4' },
            'Created'),
          div({ className: 'col s10 m8' },
            unix(created).fromNow())),
        div({ className: 'row' },
          div({ className: 'profile-label col s2 m4' },
            'Karma'),
          div({ className: 'col s10 m8' },
            karma)),
        div({ className: 'row' },
          div({ className: 'profile-label col s2 m4' },
            'About'),
          div({
            className: 'col s10 m8',
            dangerouslySetInnerHTML: { __html: about }
          })),
        div({ className: 'row' },
          div({ className: 'col s12 m4 offset-m2 l3 offset-l3' },
            a({ className: 'profile-btn', href: `/users/${id}/submissions/` },
              'Submitted')),
          div({ className: 'col s12 m4 l3' },
            a({ className: 'profile-btn', href: `/users/${id}/comments/` },
              'Comments'))));

    return tree;
  }
}

Profile.propTypes = {
  /**
   * An object reperesenting a user is the only required Prop for this object.
   */
  user: PropTypes.shape({
    /**
     * HTML string representing the user's profile.
     */
    about: PropTypes.string,
    /**
     * UTC time of the moment the user created their account.
     */
    created: PropTypes.number.isRequired,
    /**
     * Unique idetnifier for the user.
     */
    id: PropTypes.string.isRequired,
    /**
     * Total karma for the user.
     */
    karma: PropTypes.number.isRequired
  }).isRequired
};

export default Profile;
