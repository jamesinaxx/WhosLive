// eslint-disable-next-line no-undef
const Chrome = chrome;
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import Footer from './pages/components/Footer';
import Live from './pages/Live';
interface HomeState {
	page: string;
	channels: string[];
}

import { setStorage, getStorage } from './lib/chromeapi';

class Home extends React.Component<any, HomeState> {
	constructor(props: any) {
		super(props);

		this.state = {
			page: 'live',
			channels: [],
		};

		getStorage('channels').then((res: string[]) => {
			this.setState({ channels: res || [] });
		});

		setStorage('channels', this.state.channels);

		Chrome.storage.onChanged.addListener(() => {
			console.log('Updated storage');
			getStorage('channels').then((res: string[]) =>
				this.setState({ channels: res || [] })
			);
		});
	}

	render() {
		console.log(getStorage('channels'));

		return (
			<div>
				<Live />
				<Footer />
			</div>
		);
	}
}

ReactDOM.render(<Home />, document.getElementById('root'));
