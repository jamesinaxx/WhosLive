import { render, createElement } from 'preact';
import Main from './main';

render(
  createElement(Main, null),
  // Explicitly cast as it will never be null
  document.getElementById('root') as HTMLElement,
);
