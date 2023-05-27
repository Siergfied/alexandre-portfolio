import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

import Carousel from '../components/Carousel.jsx';

export default function ImageDisplay() {
	const [imageData, setImageData] = useState([]);

	const fetchImageData = async () => {
		const data = await getDocs(collection(db, 'images'));

		let imageArray = [];
		data.forEach((doc) => {
			imageArray.unshift({ ...doc.data() });
		});
		setImageData(imageArray);
	};

	useEffect(() => {
		fetchImageData();
		document.title = 'Réalisations - AF';
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

	const setClass = (number) => {
		const classArray = ['absolute w-full h-full '];

		switch (number) {
			case carouselIndex:
				classArray.push('duration-700 ease-in-out visible opacity-100');
				break;
			case previousCarousel(carouselIndex, imageData.length):
				classArray.push('visible duration-700 ease-in-out -translate-x-full opacity-0');
				break;
			case nextCarousel(carouselIndex, imageData.length):
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
			<Carousel array={imageData} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex}>
				<div className='h-full w-full'>
					<div className='h-full w-full relative overflow-hidden'>
						{imageData.map(({ id, cover, background, title, description }, index) => (
							<div className={setClass(index)} key={id}>
								<img src={background} alt={title} className='w-full h-full object-cover blur-sm' />
								<div className='absolute top-0 left-0 flex h-full py-12 px-44 justify-between gap-24'>
									<img src={cover} alt={title} className='max-h-full h-auto max-w-full w-auto border-8 border-zinc-800' />

									<div className='flex flex-col gap-12 h-fit border-8 border-zinc-800 bg-zinc-800/75 backdrop-blur-md text-zinc-300 p-4 grow-0 basis-4/6 '>
										<h2 className='text-3xl font-bold uppercase'>{title}</h2>
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

/*

			{imageData[carouselIndex] && (
				<Carousel array={imageData} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex}>
					<div className='flex h-full justify-center overflow-hidden relative '>
						<div className='flex h-full w-1/4 -translate-x-full '>
							<img
								src={imageData[previousCarousel(carouselIndex, imageData.length)].background}
								alt={imageData[previousCarousel(carouselIndex, imageData.length)].title}
								className='w-full h-full object-cover blur-sm'
							/>
						</div>
						<div className='flex h-full w-1/4 absolute'>
							<img src={imageData[carouselIndex].background} alt={imageData[carouselIndex].title} className='w-full h-full object-cover blur-sm' />
							<div className='absolute bg-white'>
								<p>Previous : {previousCarousel(carouselIndex, imageData.length)} </p>
								<p>Active : {carouselIndex} </p>
								<p>Next : {nextCarousel(carouselIndex, imageData.length)} </p>
							</div>
						</div>
						<div className='flex h-full w-1/4 translate-x-full '>
							<img
								src={imageData[nextCarousel(carouselIndex, imageData.length)].background}
								alt={imageData[nextCarousel(carouselIndex, imageData.length)].title}
								className='w-full h-full object-cover blur-sm'
							/>
						</div>
					</div>
				</Carousel>
			)}

{imageData[carouselIndex] && (
				<Carousel array={imageData} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex}>
					<div className='flex h-full overflow-hidden'>
						<div className='flex h-full w-full relative'>
							<img src={imageData[carouselIndex].background} alt={imageData[carouselIndex].title} className='w-full h-full object-cover blur-sm' />
							<div className='absolute flex h-full py-12 px-44 justify-between gap-24'>
								<img src={imageData[carouselIndex].cover} alt={imageData[carouselIndex].title} className='max-h-full h-auto max-w-full w-auto border-8 border-zinc-800' />

								<div className='flex flex-col gap-12 h-fit border-8 border-zinc-800 bg-zinc-800/75 backdrop-blur-md text-zinc-300 p-4 grow-0 basis-4/6 '>
									<h2 className='text-3xl font-bold uppercase'>{imageData[carouselIndex].title}</h2>
									<p className='font-normal text-xl '>{imageData[carouselIndex].description}</p>
									<p>{previousCarousel(carouselIndex, imageData.length)} </p>
									<p>{carouselIndex} </p>
									<p>{nextCarousel(carouselIndex, imageData.length)} </p>
								</div>
							</div>
						</div>
					</div>
				</Carousel>
			)}
*/
