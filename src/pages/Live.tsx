import React from 'react';
import Channel from './components/Channel';
import { getStorageLocal } from '../lib/chromeapi';

export default class LiveChannels extends React.Component<{}, { comp: any }> {
	constructor(props: any) {
		super(props);
		this.state = {
			comp: <div>{null}</div>,
		};
	}

	componentDidMount() {
		const interval = setInterval(() => {
			getStorageLocal('channels').then((res: any[]) => {
				if (res === undefined) return;

				clearInterval(interval);
				console.log('Channel type be thee ' + res);
				this.setState({
					comp: (
						<div className="main">
							{!res.length ? (
								<small>Add channels in the settings page</small>
							) : (
								res.map((channelData, i) => (
									<Channel
										key={i}
										online
										data={channelData}
									/>
								))
							)}
						</div>
					),
				});
			});
		}, 1000);
	}

	render() {
		return this.state.comp;
	}
}
