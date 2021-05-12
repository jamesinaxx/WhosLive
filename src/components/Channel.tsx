import React from 'react';
import axios from 'axios';
import { client_id, token } from '../../public/config';
import FastAverageColor from 'fast-average-color';

interface ChannelProps {
	name: string;
	online: boolean;
}

interface ChannelState {
	bgColor: string;
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
			bgColor: '#FFF',
			color: '#000',
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
			return this.setState({ bgColor: '#FFF' });

		fac.getColorAsync(url)
			.then((color) => {
				this.setState({
					bgColor: color.rgba,
					color: color.isLight ? '#000' : '#FFF',
				});
			})
			.catch((e) => console.error(e));
	}

	render() {
		return (
			<div hidden={this.state.hidden}>
				{(this.state.data !== undefined && this.props.online) ||
				(this.state.data === undefined && !this.props.online) ? (
					<div className="channel">
						{/*Open twitch channel on click*/}
						<div
							className="channelImage"
							style={{
								backgroundColor: this.state.bgColor,
								color: this.state.color,
							}}>
							<img
								onLoad={() => this.getColor(this.state.url)}
								src={this.state.url}
								width={100}
								height={100}></img>
							<div className="channelInfo">
								<h1>(Name)</h1>
								<p>
									(Name) is currently playing (game) (maybe
									for viewer count?)
								</p>
							</div>
						</div>
					</div>
				) : (
					<div>{null}</div>
				)}
			</div>
		);
	}
}
