import React from 'react';
import axios from 'axios';
import { client_id, token } from '../../public/config';
import FastAverageColor from 'fast-average-color';

interface ChannelProps {
	name: string;
	online: boolean;
}

interface ChannelState {
	color: string;
	url: string;
	hidden: boolean;
	data: {
		id: string;
		type: string;
	};
}

export default class Channel extends React.Component<
	ChannelProps,
	ChannelState
> {
	constructor(props: ChannelProps) {
		super(props);

		this.state = {
			color: '#FFF',
			hidden: true,
			url: 'https://about:blank',
			data: {
				id: 'Loading...',
				type: null,
			},
		};
	}

	componentDidMount() {
		axios
			.get('https://api.twitch.tv/helix/streams', {
				params: { user_login: this.props.name },
				headers: {
					'Client-Id': client_id,
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				console.log(
					'Just sent a request for the user: ' + this.props.name
				);
				this.setState({ data: res.data.data[0] });
			})
			.catch((e) => console.error(e));

		axios
			.get('https://api.twitch.tv/helix/users', {
				params: { login: this.props.name },
				headers: {
					'Client-Id': client_id,
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				console.log(
					'Just sent a request for the user: ' + this.props.name
				);
				this.setState({ hidden: false });
				this.setState({ url: res.data.data[0].profile_image_url });
			})
			.catch((e) => console.error(e));
	}

	getColor(url: string) {
		const fac = new FastAverageColor();

		if (url === 'https://about:blank')
			return this.setState({ color: '#FFF' });

		fac.getColorAsync(url)
			.then((color) => {
				this.setState({ color: color.rgba });
			})
			.catch((e) => console.error(e));
	}

	render() {
		return (
			<div hidden={this.state.hidden}>
				{(this.state.data !== undefined && this.props.online) ||
				(this.state.data === undefined && !this.props.online) ? (
					<div className="channel">
						<div
							className="channelImage"
							style={{ backgroundColor: this.state.color }}>
							<img
								onLoad={() => this.getColor(this.state.url)}
								src={this.state.url}
								width={100}
								height={100}></img>
						</div>
					</div>
				) : (
					<div>{null}</div>
				)}
			</div>
		);
	}
}
