import React from 'react';
import styles from '../styles/layout.module.scss';
import Channel from './components/Channel';
import { getStorageLocal } from '../lib/chromeapi';
import Loading from './components/Loading';

export default class LiveChannels extends React.Component<
	{ color: string },
	{ channels: any[]; loading: boolean }
> {
	constructor(props: any) {
		super(props);
		this.state = {
			channels: null,
			loading: true,
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

		if (this.state.channels.length === 0) {
			return (
				<small className={styles.goFollow}>
					Go follow somebody and come back to see when they are live!
				</small>
			);
		}

		console.log(this.state.loading);
		return (
			<>
				<Loading
					hidden={!this.state.loading}
					color={this.props.color}
				/>
				{this.state.channels.map((channelData, i) => (
					<Channel
						key={i}
						online
						data={channelData}
						doneLoading={() => this.doneLoading()}
					/>
				))}
			</>
		);
	}

	render() {
		return <div className={styles.main}>{this.showChannels()}</div>;
	}
}
