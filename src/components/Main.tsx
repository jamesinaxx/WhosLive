import React from 'react';

type MainProps = {
	channels: string[];
};

export default function Main(props: MainProps) {
	return (
		<div className="main">
			<small>
				{!props.channels ? 'Add channels in the settings page' : null}
			</small>
		</div>
	);
}
