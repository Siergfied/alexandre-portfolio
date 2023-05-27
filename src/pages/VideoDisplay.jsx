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
		document.title = 'Videos - AF';
	}, []);

	const [carouselIndex, setCarouselIndex] = useState(0);

	const nextCarousel = (carouselIndex, carouselLength) => {
		if (carouselIndex == carouselLength - 1) {
			return 0;
		} else {
			return carouselIndex + 1;
		}
	};

	const previousCarousel = (carouselIndex, carouselLength) => {
		if (carouselIndex == 0) {
			return carouselLength - 1;
		} else {
			return carouselIndex - 1;
		}
	};

	const setClass = (index) => {
		const classArray = ['absolute w-full h-full '];

		switch (index) {
			case carouselIndex:
				classArray.push('duration-700 ease-in-out visible opacity-100');
				break;
			case previousCarousel(carouselIndex, videoData.length):
				classArray.push('visible duration-700 ease-in-out -translate-x-full opacity-0');
				break;
			case nextCarousel(carouselIndex, videoData.length):
				classArray.push('visible duration-700 ease-in-out translate-x-full opacity-0');
				break;
			default:
				classArray.push('invisible opacity-0');
				break;
		}

		return classArray.join('');
	};

	return (
		<>
			<Carousel array={videoData} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex}>
				<div className='h-full w-full'>
					<div className='h-full w-full relative overflow-hidden'>
						{videoData.map(({ id, url, title, description }, index) => (
							<div className={setClass(index)} key={id}>
								<div className='flex h-full px-44 py-12 justify-between gap-12 relative bg-gradient-to-b from-zinc-300 via-zinc-700 to-zinc-800'>
									<div className='border-8 border-zinc-800 w-full h-fit'>
										<iframe
											className='aspect-video w-full'
											src={'https://www.youtube.com/embed/' + url.split('=')[1]}
											title='YouTube video player'
											allow='accelerometer; clipboard-write; encrypted-media; gyroscope; web-share'
										/>
									</div>

									<div className='flex flex-col gap-12 h-fit border-8 border-zinc-800 bg-zinc-800/75 backdrop-blur-md text-zinc-300 p-4 w-1/2'>
										<p className='text-3xl font-bold uppercase'>{title}</p>
										<p className='font-normal text-xl '>{description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</Carousel>
		</>
	);
}
