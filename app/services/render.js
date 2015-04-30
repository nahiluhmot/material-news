import { ROOT_ELEMENT_ID } from 'config/constants';
import { createElement, unmountComponentAtNode, render } from 'react';

/**
 * Render the given React class at the root node.
 */
export default (type, options, done) => {
  const node = document.getElementById(ROOT_ELEMENT_ID);
  const element = createElement(type, options);

  unmountComponentAtNode(node);
  render(element, node, done);
};
