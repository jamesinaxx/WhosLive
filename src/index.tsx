import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import Footer from './pages/components/Footer';
import Live from './pages/Live';

function Main() {
	return (
		<div>
			<Live />
			<Footer />
		</div>
	);
}

ReactDOM.render(<Main />, document.getElementById('root'));
