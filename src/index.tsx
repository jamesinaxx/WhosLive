import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import { Footer } from './components/all';
import Live from './pages/Live';

let channels = ['jamesinaxx', 'ruepa', 'kinzixx'];

function Home() {
	return (
		<div>
			<Live channels={channels} />
			<Footer />
		</div>
	);
}

ReactDOM.render(<Home />, document.getElementById('root'));
