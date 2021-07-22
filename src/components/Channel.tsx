import React from 'react';
import FastAverageColor from 'fast-average-color';
import styles from '@styles/channel.module.scss';
import axios from 'axios';
import { client_id } from '@lib/lib';
import { getStorage } from '@lib/chromeapi';

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

		getStorage('NowLive:Storage:Token').then(async token =>
			this.setState({
				url: (
					await axios.get('https://api.twitch.tv/helix/users', {
						params: {
							login: this.props.data.user_name,
						},
						headers: {
							'Client-Id': client_id,
							Authorization: 'Bearer ' + token,
						},
					})
				).data.data[0].profile_image_url,
			})
		);

		this.getColor = this.getColor.bind(this);
	}

	async getColor(url: string) {
		const fac = new FastAverageColor();

		if (url === 'https://about:blank') return;

		const color = await fac.getColorAsync(url);
		this.setState({
			bgColor: color.rgb,
			color: color.isLight ? '#000' : '#FFF',
			hidden: false,
		});

		this.props.doneLoading();
		return fac.destroy();
	}

	getTitle(ogTitle: string): string {
		if (ogTitle.length > 28)
			return (
				ogTitle.substring(0, ogTitle.length - (ogTitle.length - 25)) +
				'...'
			);

		return ogTitle;
	}

	render() {
		const { title, user_name, user_login, viewer_count, game_name } =
			this.props.data;

		const titleElem = document.getElementById(
			`titleSpan${user_login}`
		) as HTMLSpanElement;

		return (
			<div
				className={styles.channelDiv}
				hidden={this.state.hidden}
				onMouseEnter={() => (titleElem.hidden = false)}
				onMouseLeave={() => (titleElem.hidden = true)}>
				<div
					className={styles.channel}
					style={{
						backgroundColor: this.state.bgColor,
						color: this.state.color,
						boxShadow: '0 0 10px ' + this.state.bgColor,
					}}>
					<img
						onLoad={() => this.getColor(this.state.url)}
						onClick={() =>
							window.open('https://twitch.tv/' + user_login)
						}
						src={this.state.url}
						width={100}
						height={100}
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
				{title.length > 24 ? (
					<span hidden={true} id={`titleSpan${user_login}`}>
						{title}
					</span>
				) : (
					<div />
				)}
			</div>
		);
	}
}
