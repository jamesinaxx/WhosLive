import React from 'react';
import FastAverageColor from 'fast-average-color';

interface ChannelProps {
	online: boolean;
	data: {
		thumbnail_url: string;
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
	data: {
		type: string;
		game_name: string;
		viewer_count: string;
		started_at: string;
		user_name: string;
		title: string;
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
				type: null,
				game_name: 'Loading...',
				viewer_count: 'Loading...',
				started_at: 'Loading...',
				user_name: 'Loading...',
				title: 'Loading...',
			},
		};
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
					hidden: false,
				});
			})
			.catch((e) => console.error(e));
	}

	render() {
		console.log('Called render method in channels');
		return (
			<div hidden={this.state.hidden}>
				{(this.props.data !== undefined && this.props.online) ||
				(this.props.data === undefined && !this.props.online) ? (
					<div className="channel">
						<div className="overlay"></div>
						{/*Open twitch channel on click*/}
						<div
							className="channelImage"
							style={{
								backgroundColor: this.state.bgColor,
								color: this.state.color,
							}}>
							<img
								onLoad={() =>
									this.getColor(
										this.props.data.thumbnail_url
											.replace('{width}', '1920')
											.replace('{height}', '1080')
									)
								}
								src={this.props.data.thumbnail_url
									.replace('{width}', '1920')
									.replace('{height}', '1080')}
								width={100}
								height={100}></img>
							<div className="channelInfo">
								<h1>{this.props.data.user_name}</h1>
								<p>
									{this.props.data.user_name} is currently
									playing {this.props.data.game_name} for{' '}
									{this.props.data.viewer_count}
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
