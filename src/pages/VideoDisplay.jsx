import React, { useState, useEffect } from 'react';

import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

import Carousel from '../components/Carousel.jsx';

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

	const [carouselIndex, setCarouselIndex] = useState(0);

	return (
		<>
			<p>Video Display</p>

			<div className='mt-6'>
				{data[carouselIndex] && (
					<Carousel array={data} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex}>
						<>
							<p>{data[carouselIndex].url}</p>
							<p>{data[carouselIndex].title}</p>
							<p>{data[carouselIndex].description}</p>
						</>
					</Carousel>
				)}
			</div>
		</>
	);
}
