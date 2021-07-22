import 'regenerator-runtime/runtime';
import React from 'react';
import styles from '@styles/layout.module.scss';
import Channel from '@components/Channel';
import { getStorage, getStorageLocal } from '@lib/chromeapi';
import Loading from '@components/Loading';

interface LiveProps {
	color: string;
}

interface LiveState {
	channels: any[] | null;
	faveChannels: any[] | null | undefined;
	loading: boolean;
}

export default class Live extends React.Component<LiveProps, LiveState> {
	constructor(props: any) {
		super(props);
		this.state = {
			channels: null,
			loading: true,
			faveChannels: null,
		};

		this.doneLoading = this.doneLoading.bind(this);
		this.showChannels = this.showChannels.bind(this);

		chrome.storage.onChanged.addListener(() => {
			this.updateChannels();
		});
	}

	async updateChannels() {
		const allChannels: any[] = await getStorageLocal(
			'NowLive:Storage:Channels'
		);
		const faveChannels: string[] = await (async () => {
			const faves = await getStorage('favorites');
			return allChannels.filter(channel => {
				if (typeof faves === 'object')
					return faves.includes(channel.user_login);
				return false;
			});
		})();
		const channels: any[] = await (async () => {
			const faves = await getStorage('favorites');
			return allChannels.filter(channel => {
				if (typeof faves === 'object')
					return !faves.includes(channel.user_login);
				return true;
			});
		})();

		this.setState({ channels, faveChannels });
	}

	componentDidMount() {
		const interval = setInterval(() => {
			getStorageLocal('NowLive:Storage:Channels').then((res: any[]) => {
				if (res === undefined) return;

				clearInterval(interval);
				this.setState({ channels: res });
			});
		}, 1000);
	}

	doneLoading() {
		this.setState({ loading: false });
	}

	showChannels() {
		if (
			this.state.channels === null ||
			this.state.faveChannels === null ||
			this.state.faveChannels === undefined
		) {
			this.updateChannels();
			return <Loading hidden={false} color={this.props.color} />;
		}

		if (
			this.state.channels.length === 0 &&
			this.state.faveChannels.length === 0
		) {
			return (
				<small className={styles.goFollow}>
					You do not follow anybody who is currently live
					<img
						src='https://cdn.frankerfacez.com/emoticon/425196/4' /* Sadge emote from FFZ */
					/>
				</small>
			);
		}

		return (
			<div>
				<Loading
					hidden={!this.state.loading}
					color={this.props.color}
				/>
				{this.state.faveChannels.map((channelData, i) => (
					<Channel
						key={i}
						online
						data={channelData}
						fave
						doneLoading={() => this.doneLoading()}
					/>
				))}
				{this.state.channels.map((channelData, i) => (
					<Channel
						key={i}
						online
						data={channelData}
						doneLoading={() => this.doneLoading()}
					/>
				))}
				<div
					/* Placeholder so the channel cards don't flow beyond the viewport */
					style={{
						height: '5px',
					}}
				/>
			</div>
		);
	}

	render() {
		return <div className={styles.main}>{this.showChannels()}</div>;
	}
}
