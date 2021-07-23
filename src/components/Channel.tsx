import React from 'react';
import FastAverageColor from 'fast-average-color';
import styles from '@styles/Channel.module.scss';

interface ChannelProps {
	online: boolean;
	data: {
		user_name: string;
		user_login: string;
		game_name: string;
		viewer_count: string;
		title: string;
		thumbnail_url: string;
	};
	doneLoading: () => void;
	hidden: boolean;
}

interface ChannelState {
	bgColor: string;
	color: string;
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
		};

		this.getColor = this.getColor.bind(this);
		this.toggleTitleShown = this.toggleTitleShown.bind(this);
	}

	async getColor() {
		const fac = new FastAverageColor();

		const facColor = await fac.getColorAsync(
			this.props.data.thumbnail_url
				.replace('{width}', '128')
				.replace('{height}', '72')
		);

		let bgColor =
			'rgba' +
			facColor.rgb.substring(3, facColor.rgb.length - 1) +
			',0.7)';

		this.setState({
			bgColor,
			color: facColor.isLight ? '#000' : '#FFF',
		});

		fac.destroy();
		return this.props.doneLoading();
	}

	getTitle(ogTitle: string): string {
		if (ogTitle.length > 28)
			return (
				ogTitle.substring(0, ogTitle.length - (ogTitle.length - 25)) +
				'...'
			);

		return ogTitle;
	}

	toggleTitleShown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		const titleElem = document.getElementById(
			`titleSpan${this.props.data.user_login}`
		);

		if (titleElem === null) return;

		titleElem.hidden = event.type === 'mouseleave';
	}

	render() {
		const {
			title,
			user_name,
			user_login,
			viewer_count,
			game_name,
			thumbnail_url,
		} = this.props.data;

		const thumbnailUrl = thumbnail_url
			.replace('{width}', '128')
			.replace('{height}', '72');

		return (
			<div
				className={styles.channelDiv}
				hidden={this.props.hidden}
				onMouseEnter={this.toggleTitleShown}
				onMouseLeave={this.toggleTitleShown}>
				<div
					className={styles.channel}
					style={{
						backgroundColor: this.state.bgColor,
						color: this.state.color,
						boxShadow: '0 0 10px ' + this.state.bgColor,
					}}>
					<img
						onLoad={() => this.getColor()}
						onClick={() =>
							window.open('https://twitch.tv/' + user_login)
						}
						src={thumbnailUrl}
						width={128}
						height={72}
					/>
					<div className={styles.channelInfo}>
						<h1>{this.getTitle(title)}</h1>
						<p>
							<b>{user_name}</b> is currently playing{' '}
							<b>{game_name}</b> for{' '}
							<b>
								{new Intl.NumberFormat(
									navigator.language
								).format(Number(viewer_count))}
							</b>{' '}
							viewers
						</p>
					</div>
				</div>
				<span hidden={true} id={`titleSpan${user_login}`}>
					{title.length > 28 ? title : ''}
				</span>
			</div>
		);
	}
}
