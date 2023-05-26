import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

import Carousel from '../components/Carousel.jsx';

export default function VideoDisplay() {
	const [videoData, setVideoData] = useState([]);

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
		document.title = 'Video - AF';
	}, []);

	const [carouselIndex, setCarouselIndex] = useState(0);

	return (
		<>
			{videoData[carouselIndex] && (
				<Carousel array={videoData} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex}>
					<div className='flex h-full px-44 py-12 justify-between gap-12 relative bg-gradient-to-b from-zinc-300 via-zinc-700 to-zinc-800'>
						<div className='border-8 border-zinc-800 w-full h-fit'>
							<iframe
								className='aspect-video w-full'
								src={'https://www.youtube.com/embed/' + videoData[carouselIndex].url.split('=')[1]}
								title='YouTube video player'
								allow='accelerometer; clipboard-write; encrypted-media; gyroscope; web-share'
							/>
						</div>

						<div className='flex flex-col gap-12 h-fit border-8 border-zinc-800 bg-zinc-800/75 backdrop-blur-md text-zinc-300 p-4 w-1/2'>
							<p className='text-3xl font-bold uppercase'>{videoData[carouselIndex].title}</p>
							<p className='font-normal text-xl '>{videoData[carouselIndex].description}</p>
						</div>
					</div>
				</Carousel>
			)}
		</>
	);
}
