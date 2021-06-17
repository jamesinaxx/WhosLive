import React from 'react';
import Channel from './components/Channel';
import { getStorageLocal } from '../lib/chromeapi';

export default class LiveChannels extends React.Component<
	{},
	{ channels: any[] }
> {
	constructor(props: any) {
		super(props);
		this.state = {
			channels: [],
		};
	}

	componentDidMount() {
		const interval = setInterval(() => {
			getStorageLocal('channels').then((res: any[]) => {
				if (res === undefined) return;

				clearInterval(interval);
				this.setState({ channels: res });
			});
		}, 1000);
	}

	showChannels() {
		if (!this.state.channels === null) {
			return <small>Add channels in the settings page</small>;
		}
		return (
			<>
				<small id='loadingChannels'>Loading live channels...</small>
				{this.state.channels.map((channelData, i) => (
					<Channel key={i} online data={channelData} />
				))}
			</>
		);
	}

	render() {
		return <div className='main'>{this.showChannels()}</div>;
	}
}
