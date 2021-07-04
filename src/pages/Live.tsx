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
	}

	componentDidMount() {
		const interval = setInterval(() => {
			getStorageLocal('channels').then((res: any[]) => {
				if (res === undefined) return;

				clearInterval(interval);
				this.setState({ channels: res });
			});
		}, 1000);
	}

	doneLoading() {
		console.log('Done loading');
		this.setState({ loading: false });
	}

	showChannels() {
		if (this.state.channels === null) {
			return <Loading hidden={false} color={this.props.color} />;
		}

		if (
			this.state.faveChannels === null ||
			this.state.faveChannels === undefined
		) {
			getStorage('favorites').then((res: string[]) => {
				this.setState({
					faveChannels: this.state.channels?.filter(channel =>
						res.includes(channel.user_login)
					),
				});
			});
			return <Loading hidden={false} color={this.props.color} />;
		}

		if (this.state.channels.length === 0) {
			return (
				<small className={styles.goFollow}>
					You do not currently follow anybody who is live :(
					<br />
					Go follow some people to see when they are live!
				</small>
			);
		}

		return (
			<>
				<Loading
					hidden={!this.state.loading}
					color={this.props.color}
				/>
				{this.state.faveChannels.map((channelData, i) => (
					<Channel
						key={i}
						online
						data={channelData}
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
					/* Placeholder so that the cards don't flow over the body limit */
					style={{
						height: '5px',
					}}
				/>
			</>
		);
	}

	render() {
		return <div className={styles.main}>{this.showChannels()}</div>;
	}
}
