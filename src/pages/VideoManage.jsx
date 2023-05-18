import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, db } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

import VideoAdd from '../components/VideoAdd.jsx';
import VideoUpdateAndDelete from '../components/VideoUpdateAndDelete.jsx';

export default function VideoManage() {
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
			} else {
				navigate('admin');
			}
		});
	}, []);

	const [data, setData] = useState([]);
	const [dataChanged, setDataChanged] = useState(false);

	const handleDataChanged = () => {
		setDataChanged(true);
	};

	const fetchData = async () => {
		const data = await getDocs(collection(db, 'videos'));
		let imagesArray = [];

		data.forEach((doc) => {
			let imageObject = {};
			imageObject.id = doc.id;
			Object.assign(imageObject, doc.data());
			imagesArray.unshift({ ...imageObject });
		});

		setData(imagesArray);
	};

	useEffect(() => {
		fetchData();
		setDataChanged(false);
	}, [dataChanged]);

	return (
		<>
			<VideoAdd stateChanger={handleDataChanged} />

			<ul>
				{data.map(({ id, url, title, description }) => (
					<li key={id} className='mt-6'>
						<VideoUpdateAndDelete id={id} url={url} title={title} description={description} stateChanger={handleDataChanged} />
					</li>
				))}
			</ul>
		</>
	);
}
