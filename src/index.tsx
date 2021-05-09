import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import { Footer, Main } from './components/all';

function Home() {
	return (
		<div>
			<Main />
			<Footer />
		</div>
	);
}

ReactDOM.render(<Home />, document.getElementById('root'));
