import React from 'react';

export default function Main(props) {
	return (
		<div className="main">
			{props.channels ? 'Add channels in the settings page' : null}
		</div>
	);
}
