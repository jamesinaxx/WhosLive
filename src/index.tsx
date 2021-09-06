import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import Main from './main';

// TODO Add better light mode vs dark mode scroll bars
const GlobalStyle = createGlobalStyle`
  body::-webkit-scrollbar {
    width: 0.5em;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #44357a;
    border-radius: 25px;
  }

  body {
    transition: background 100ms ease-in-out;
    // Width and height to cap extension size, Can cause issues with scrollbar showing when there is nothing to scroll
    width: 550px;
    height: 550px;
  }
`;

render(
  <>
    <GlobalStyle />
    <Main />
  </>,
  document.getElementById('root') as HTMLElement,
);
