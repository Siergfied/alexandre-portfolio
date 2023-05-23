import React, { useState, useEffect } from 'react';

import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

import ImageAdd from '../fragments/ImageAdd.jsx';
import ImageUpdateAndDelete from '../fragments/ImageUpdateAndDelete.jsx';

//TODO add field validation and error message

export default function ImageManage() {
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
			<div className='px-24'>
				<ImageAdd stateChanger={handleDataChanged} />

				<ul>
					{data.map(({ id, cover, background, title, description }) => (
						<li key={id} className='mt-6'>
							<ImageUpdateAndDelete id={id} cover={cover} background={background} title={title} description={description} stateChanger={handleDataChanged} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
