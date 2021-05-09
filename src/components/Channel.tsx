import React, { useState } from 'react';
import axios from 'axios';
import { client_id, token } from '../../public/config';

type ChannelProps = {
	name: string;
};

export default function Channel(props: ChannelProps) {
	const [data, setData] = useState({
		id: 'Loading...',
		profile_image_url: 'https://about:blank',
	});

	axios
		.get('https://api.twitch.tv/helix/users', {
			params: { login: props.name },
			headers: {
				'Client-Id': client_id,
				Authorization: 'Bearer ' + token,
			},
		})
		.then((res) => {
			setData(res.data.data[0]);
		})
		.catch((e) => console.error(e));

	return (
		<div className="channel">
			<img src={data.profile_image_url} width={100} height={100}></img>
			<p>{data.id}</p>
		</div>
	);
}
