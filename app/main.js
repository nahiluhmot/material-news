import { dispatch, setRoutes } from 'aviator';
import Routes from 'config/routes';

/**
 * This file attaches the application initialization script to window.onload.
 */
window.onload = () => {
  setRoutes(Routes);
  dispatch();
};
