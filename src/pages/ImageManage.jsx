import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, db } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

import ImageAdd from '../components/ImageAdd.jsx';
import ImageUpdateAndDelete from '../components/ImageUpdateAndDelete.jsx';

export default function ImageManage() {
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
		const data = await getDocs(collection(db, 'images'));
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
			<ImageAdd stateChanger={handleDataChanged} />

			<ul>
				{data.map(({ id, cover, background, title, description }) => (
					<li key={id} className='mt-6'>
						<ImageUpdateAndDelete id={id} cover={cover} background={background} title={title} description={description} stateChanger={handleDataChanged} />
					</li>
				))}
			</ul>
		</>
	);
}
