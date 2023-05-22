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

	const video = document.querySelector('.video-stream html5-main-video');
	console.log(video);

	return (
		<>
			{data[carouselIndex] && (
				<Carousel array={data} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex}>
					<div className='border-4 border-red-600 flex flex-row h-full'>
						<iframe
							className='h-4/5 aspect-video'
							src={'https://www.youtube.com/embed/' + data[carouselIndex].url.split('=')[1]}
							title='YouTube video player'
							allow='accelerometer; clipboard-write; encrypted-media; gyroscope; web-share'
						></iframe>
						<div>
							<p>{data[carouselIndex].url}</p>
							<p>{data[carouselIndex].title}</p>
							<p>{data[carouselIndex].description}</p>
							<p>{data[carouselIndex].url.split('=')[1]} </p>
						</div>
					</div>
				</Carousel>
			)}
		</>
	);
}
