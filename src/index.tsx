import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import { Footer } from './components/all';
import Live from './pages/Live';
import Offline from './pages/Offline';

let channels = ['jamesinaxx', 'ruepa', 'kinzixx'];

interface HomeState {
	page: string;
}

let Component = Live;

class Home extends React.Component<any, HomeState> {
	constructor(props: any) {
		super(props);

		this.state = {
			page: 'live',
		};
	}

	render() {
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
				<Component channels={channels} />
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
