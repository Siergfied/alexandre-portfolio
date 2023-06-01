import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import VideoAdd from '../../fragments/VideoAdd.jsx';
import VideoUpdateAndDelete from '../../fragments/VideoUpdateAndDelete.jsx';

import { h2Style } from '../../layouts/Style.jsx';

export default function VideoManage() {
	const [videoData, setVideoData] = useState([]);
	const [dataChanged, setDataChanged] = useState(false);

	const handleDataChanged = () => {
		setDataChanged(true);
	};

	const fetchVideoData = async () => {
		const data = await getDocs(query(collection(db, 'videos'), orderBy('order')));

		const videoArray = [];
		data.forEach((doc) => {
			videoArray.push(doc.data());
		});

		setVideoData(videoArray);
	};

	useEffect(() => {
		fetchVideoData();
		setDataChanged(false);
		document.title = 'Video - Admin - AF';
	}, [dataChanged]);

	return (
		<>
			<div className='px-4'>
				<div>
					<h2 className={h2Style}>Ajouter une vidéo</h2>
					<VideoAdd stateChanger={handleDataChanged} videosDocuments={videoData} />
				</div>

				{videoData.length != 0 && (
					<div className='mt-4'>
						<h2 className={h2Style}>Modifier les vidéos</h2>
						<ul className='flex flex-col w-full gap-6'>
							{videoData.map(({ id, order, url, title, description }) => (
								<li key={id + order}>
									<VideoUpdateAndDelete
										id={id}
										order={order}
										url={url}
										title={title}
										description={description}
										stateChanger={handleDataChanged}
										videosDocuments={videoData}
									/>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
