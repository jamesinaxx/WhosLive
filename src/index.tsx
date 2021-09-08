import { render as renderDom } from 'preact';
import { getChannelInfo } from './lib/chromeapi';
import App from './pages/app';

// TODO Add support for multiple pages of live streams

if (process.env.PRODUCTION === 'false') {
  getChannelInfo();
}

function render() {
  renderDom(<App />, document.body);
}

render();
