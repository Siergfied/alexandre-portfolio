import React, { useState, useEffect } from 'react';

import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

export default function ImageDisplay() {
	const [data, setData] = useState([]);

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
	}, []);

	return (
		<div>
			ImageDisplay
			<ul>
				{data.map(({ id, cover, background, title, description }) => (
					<li key={id} className='mt-6'>
						<p>{cover}</p>
						<p>{background}</p>
						<p>{title}</p>
						<p>{description}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
