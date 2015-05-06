import ErrorPage from 'components/pages/error';
import render from 'services/render';
import { defaults } from 'underscore';

/**
 * This object contains methods for transforming optional error messages into
 * user-consumable error pages.
 */
const Errors = {
  /**
   * Render the error page.
   */
  show({ queryParams: props }) {
    render(ErrorPage, defaults(props, {
      message: 'Unable to render the page that you requested'
    }));
  },
};

export default Errors;
