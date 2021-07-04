import React from 'react';
import FastAverageColor from 'fast-average-color';
import styles from '@styles/channel.module.scss';
import axios from 'axios';
import { client_id } from '@/index';
import { getStorage, setStorage } from '@lib/chromeapi';
import FavoriteButton from '@/components/buttons/FavoriteButton';

interface ChannelProps {
	online: boolean;
	data: {
		user_name: string;
		user_login: string;
		game_name: string;
		viewer_count: string;
		title: string;
	};
	fave?: boolean;
	doneLoading: () => void;
}

interface ChannelState {
	bgColor: string;
	color: string;
	url: string;
	hidden: boolean;
	favorite: boolean;
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
			favorite: false,
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
		this.toggleFavorite = this.toggleFavorite.bind(this);
	}

	componentDidMount() {
		this.getColor(this.state.url);
		this.setState({
			favorite: this.props.fave || false,
		});
	}

	getColor(url: string) {
		console.log(`Started loading channel: ${this.props.data.user_name}`);
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

		console.log(`Finished loading channel: ${this.props.data.user_name}`);

		this.props.doneLoading();
	}

	getTitle(ogTitle: string): string {
		if (ogTitle.length > 24)
			return (
				ogTitle.substring(0, ogTitle.length - (ogTitle.length - 21)) +
				'...'
			);

		return ogTitle;
	}

	addStreamer() {
		getStorage('favorites').then((res: string[] | undefined) => {
			console.log('Old faves', res);
			if (typeof res !== 'object') {
				setStorage('favorites', [this.props.data.user_login]);
			} else {
				setStorage('favorites', res.push(this.props.data.user_login));
			}
		});
	}

	removeStreamer() {
		getStorage('favorites').then((res: string[] | undefined) => {
			console.log('Old faves', res);
			if (res === undefined) return;
			else
				setStorage(
					'favorites',
					(() => {
						const index = res.indexOf(this.props.data.user_login);
						if (index > -1) {
							const removed = res;
							removed.splice(index, 1);
							return removed;
						}
					})()
				);
		});
	}

	toggleFavorite() {
		if (!this.state.favorite) {
			this.addStreamer();
		} else {
			this.removeStreamer();
		}

		getStorage('favorites').then(res => console.log(res));

		this.setState({ favorite: !this.state.favorite });
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
					<FavoriteButton
						favorite={this.state.favorite}
						setFavorite={this.toggleFavorite}
					/>
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
