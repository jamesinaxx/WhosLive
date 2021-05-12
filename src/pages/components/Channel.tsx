import React from 'react';
import FastAverageColor from 'fast-average-color';
import axios from 'axios';
import { client_id, token } from '../../../public/config';

interface ChannelProps {
	online: boolean;
	data: {
		user_name: string;
		game_name: string;
		viewer_count: string;
	};
}

interface ChannelState {
	bgColor: string;
	color: string;
	url: string;
	hidden: boolean;
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
		};

		axios
			.get('https://api.twitch.tv/helix/users', {
				params: {
					login: this.props.data.user_name,
				},
				headers: {
					'Client-Id': client_id,
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				this.setState({ url: res.data.data[0].profile_image_url });
			});
	}

	getColor(url: string) {
		console.log('Profile image url is ' + url);

		const fac = new FastAverageColor();

		if (url === 'https://about:blank') return;

		fac.getColorAsync(url)
			.then((color) => {
				console.log('We got the color');
				this.setState({
					bgColor: color.rgba,
					color: color.isLight ? '#000' : '#FFF',
					hidden: false,
				});
			})
			.catch((e) => console.error(e));
	}

	render() {
		console.log('Called render method in channels');

		console.log(
			this.props.data === undefined
				? 'Props are NOT defined'
				: 'Props are defined'
		);

		console.log('This is meant to be the ' + this.props.online + ' page');

		console.log('Prof url is ' + this.state.url);

		return (
			<div className="channel" hidden={this.state.hidden}>
				<div className="overlay"></div>
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
						<h1>{this.props.data.user_name}</h1>
						<p>
							{this.props.data.user_name} is currently playing{' '}
							{this.props.data.game_name} for{' '}
							{this.props.data.viewer_count}
						</p>
					</div>
				</div>
			</div>
		);
	}
}
