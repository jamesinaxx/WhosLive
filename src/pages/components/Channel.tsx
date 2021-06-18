import React from 'react';
import FastAverageColor from 'fast-average-color';
import axios from 'axios';
import { client_id } from '../../../src/index';
import { getStorage } from '../../lib/chromeapi';

interface ChannelProps {
	online: boolean;
	data: {
		user_name: string;
		user_login: string;
		game_name: string;
		viewer_count: string;
		title: string;
	};
	doneLoading: () => void;
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

		getStorage('twitchtoken').then(token => {
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
				.then(res => {
					this.setState({ url: res.data.data[0].profile_image_url });
				});
		});

		this.getColor = this.getColor.bind(this);
	}

	componentDidMount() {
		this.getColor(this.state.url);
	}

	getColor(url: string) {
		console.log('Started loading...');
		const fac = new FastAverageColor();

		if (url === 'https://about:blank') return;

		fac.getColorAsync(url)
			.then(color => {
				this.setState({
					bgColor: color.rgba,
					color: color.isLight ? '#000' : '#FFF',
					hidden: false,
				});
			})
			.catch(e => console.error(e));

		console.log('Finished loading...');

		this.props.doneLoading();
	}

	render() {
		return (
			<div
				onClick={() =>
					window.open(
						'https://twitch.tv/' + this.props.data.user_login
					)
				}
				className='channel'
				hidden={this.state.hidden}
			>
				<div
					className='channelImage'
					style={{
						backgroundColor: this.state.bgColor,
						color: this.state.color,
						boxShadow: '0 0 10px ' + this.state.bgColor,
					}}
				>
					<img
						onLoad={() => this.getColor(this.state.url)}
						src={this.state.url}
						width={100}
						height={100}
					></img>
					<div className='channelInfo'>
						<h1>
							{this.props.data.title.length > 24
								? this.props.data.title.substring(
										0,
										this.props.data.title.length -
											(this.props.data.title.length - 24)
								  ) + '...'
								: this.props.data.title}
						</h1>
						<p>
							<b>{this.props.data.user_name}</b> is currently
							playing <b>{this.props.data.game_name}</b> for{' '}
							<b>
								{new Intl.NumberFormat('en-US').format(
									Number(this.props.data.viewer_count)
								)}
							</b>{' '}
							viewers
						</p>
					</div>
				</div>
			</div>
		);
	}
}
