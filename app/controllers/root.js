import { navigate } from 'aviator';

/**
 * This is the top level application controller.
 */
export default {
  /**
   * When the user hits the home page, navigate to '/stories/top/'.
   */
  home: () => navigate('/stories/top/')
};
