import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import Footer from './components/Footer';
import Live from './pages/Live';
import Offline from './pages/Offline';
interface HomeState {
	page: string;
	channels: string[];
}

let Component = Live;

import { setStorage, getStorage } from '../public/chrome/scripts/chromeapi.js';

class Home extends React.Component<any, HomeState> {
	constructor(props: any) {
		super(props);

		this.state = {
			page: 'live',
			channels: [],
		};

		getStorage('channels').then((res) => {
			this.setState({ channels: res || [] });
		});

		setStorage('channels', this.state.channels);

		// eslint-disable-next-line no-undef
		chrome.storage.onChanged.addListener(() => {
			console.log('Updated storage');
			getStorage('channels').then((res) =>
				this.setState({ channels: res || [] })
			);
		});
	}

	render() {
		console.log(getStorage('channels'));

		switch (this.state.page) {
			case 'live':
				Component = Live;
				break;
			case 'offline':
				Component = Offline;
				break;
			default:
				Component = Live;
				break;
		}

		return (
			<div>
				<Component channels={this.state.channels} />
				<Footer
					handleChange={(page: string) => {
						this.setState({ page: page.toLowerCase() });
						console.log('Called');
						console.log(this.state.page);
					}}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Home />, document.getElementById('root'));
