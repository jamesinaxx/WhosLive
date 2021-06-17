import React from 'react';
import Channel from './components/Channel';
import { getStorageLocal } from '../lib/chromeapi';
import Loading from './components/Loading';

export default class LiveChannels extends React.Component<
	{},
	{ channels: any[] }
> {
	constructor(props: any) {
		super(props);
		this.state = {
			channels: null,
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
		if (this.state.channels.length === 0) {
			return (
				<small>
					Go follow somebody and come back to see when they are live!
				</small>
			);
		}
		return (
			<>
				<Loading />
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
