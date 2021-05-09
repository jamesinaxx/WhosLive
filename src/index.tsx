import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import { Footer } from './components/all';

function Main() {
	return (
		<div>
			<div className="main">Add channels in the settings page</div>
			<Footer />
		</div>
	);
}

ReactDOM.render(<Main />, document.getElementById('root'));
