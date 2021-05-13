import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import Live from './pages/Live';
import SettingsButton from './pages/components/SettingsButton';

function Main() {
	return (
		<div>
			<Live />
			<SettingsButton />
		</div>
	);
}

ReactDOM.render(<Main />, document.getElementById('root'));
