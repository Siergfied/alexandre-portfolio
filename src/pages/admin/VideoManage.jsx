import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

import VideoAdd from '../../fragments/VideoAdd.jsx';
import VideoUpdateAndDelete from '../../fragments/VideoUpdateAndDelete.jsx';

export default function VideoManage() {
	const [videoData, setVideoData] = useState([]);
	const [dataChanged, setDataChanged] = useState(false);

	const handleDataChanged = () => {
		setDataChanged(true);
	};

	const fetchVideoData = async () => {
		const data = await getDocs(collection(db, 'videos'));

		let videoArray = [];
		data.forEach((doc) => {
			videoArray.unshift({ ...doc.data() });
		});
		setVideoData(videoArray);
	};

	useEffect(() => {
		fetchVideoData();
		setDataChanged(false);
		document.title = 'Video - Admin - AF';
	}, [dataChanged]);

	const h2Style = 'flex items-center whitespace-nowrap justify-between gap-4 py-4 px-4 font-medium text-zinc-200 before:block before:w-full before:border before:bg-zinc-200 after:block after:w-full after:border after:bg-zinc-200';

	return (
		<>
			<div className='px-4'>
				<div>
					<h2 className={h2Style}>Ajouter une vidéo</h2>
					<VideoAdd stateChanger={handleDataChanged} />
				</div>

				<div className='mt-4'>
					<h2 className={h2Style}>Modifier les vidéos</h2>
					<ul className='flex flex-col w-full gap-6'>
						{videoData.map(({ id, url, title, description }) => (
							<li key={id}>
								<VideoUpdateAndDelete id={id} url={url} title={title} description={description} stateChanger={handleDataChanged} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
