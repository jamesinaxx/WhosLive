import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import Live from './pages/Live';
import SettingsButton from './pages/components/SettingsButton';
import { getStorage } from './lib/chromeapi';
import NoAuthPage from './pages/NoAuth';

const client_id = '6ucdumdkn0j562bf9oog38efzmx4vh';

class Main extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			userToken: null,
		};
	}

	componentDidMount() {
		getStorage('userToken').then(res => this.setState({ userToken: res }));

		// eslint-disable-next-line no-undef
		chrome.storage.onChanged.addListener(changes => {
			getStorage('userToken').then(res =>
				this.setState({ userToken: res })
			);
		});
	}

	render() {
		return (
			<div>
				{this.state.userToken ? <Live /> : <NoAuthPage />}
				<SettingsButton />
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));

export { client_id };
