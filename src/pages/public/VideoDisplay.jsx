import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import Carousel from '../../components/Carousel.jsx';

export default function Video() {
	const [videoData, setVideoData] = useState([]);

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
		document.title = 'Videos - AF';
	}, []);

	const [carouselIndex, setCarouselIndex] = useState(0);

	const nextCarouselIndex = (carouselIndex, carouselLength) => {
		if (carouselIndex == carouselLength - 1) {
			return 0;
		} else {
			return carouselIndex + 1;
		}
	};

	const previousCarouselIndex = (carouselIndex, carouselLength) => {
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
			case previousCarouselIndex(carouselIndex, videoData.length):
				classArray.push('visible duration-700 ease-in-out -translate-x-full opacity-0');
				break;
			case nextCarouselIndex(carouselIndex, videoData.length):
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
			<h1 className='invisible hidden'>Vidéos</h1>
			<Carousel array={videoData} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex}>
				<div className='h-full w-full'>
					<div className='h-full w-full relative overflow-hidden border-8 border-[#8759B4] rounded bg-zinc-700'>
						{videoData.map(({ id, url, title, description }, index) => (
							<div className={setClass(index)} key={id}>
								<div className='flex h-full px-16 py-12 justify-between gap-16 relative '>
									<div className='border-8 border-zinc-800 w-full h-fit rounded bg-zinc-800/70 backdrop-blur-md'>
										<iframe
											className='aspect-video w-full'
											src={'https://www.youtube.com/embed/' + url.split('=')[1]}
											title='YouTube video player'
											allow=''
											allowFullScreen
										/>
									</div>

									<div className='flex flex-col gap-12 h-fit border-8 border-zinc-800 bg-zinc-800/70 backdrop-blur-md p-4 w-1/2 rounded'>
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
