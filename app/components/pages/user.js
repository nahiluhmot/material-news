import { Component, createElement as create, DOM } from 'react';

import Root from 'components/pages/root';
import Profile from 'components/users/profile';

/**
 * This class is used to show the previews of the top stories.
 */
class User extends Component {
  /**
   * Create a new User page.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const tree =
      create(Root, {},
        create(Profile, this.props));

    return tree;
  }
}

User.propTypes = Profile.propTypes;

export default User;
