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
	data: {
		profile_image_url: string;
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
			data: {
				profile_image_url: 'https://about:blank',
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
		if (!this.state.data) {
			return (
				<div className="channel">
					<div
						className="channelImage"
						style={{ backgroundColor: this.state.color }}>
						<img
							onLoad={() =>
								this.getColor(this.state.data.profile_image_url)
							}
							src={this.state.data.profile_image_url}
							width={100}
							height={100}></img>
					</div>
				</div>
			);
		}
	}
}
