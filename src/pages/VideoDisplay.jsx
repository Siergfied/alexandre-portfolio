import React, { useState, useEffect } from 'react';

import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

export default function VideoDisplay() {
	const [data, setData] = useState([]);

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
	}, []);

	return (
		<div>
			VideoDisplay
			<ul>
				{data.map(({ id, url, title, description }) => (
					<li key={id} className='mt-6'>
						<p>{url}</p>
						<p>{title}</p>
						<p>{description}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
