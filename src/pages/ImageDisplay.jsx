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
	}, []);

	const [carouselIndex, setCarouselIndex] = useState(0);

	return (
		<>
			{imageData[carouselIndex] && (
				<Carousel array={imageData} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex}>
					<div className='flex h-full overflow-hidden'>
						<div className='flex h-full w-full relative'>
							<img src={imageData[carouselIndex].background} alt={imageData[carouselIndex].title} className='w-full h-full object-cover blur-sm' />
							<div className='absolute flex h-full py-12 px-44 justify-between gap-24'>
								<img
									src={imageData[carouselIndex].cover}
									alt={imageData[carouselIndex].title}
									className='max-h-full h-auto max-w-full w-auto border-8 border-zinc-800 shadow-2xl shadow-zinc-600'
								/>

								<div className='flex flex-col gap-12 h-fit border-8 border-zinc-800 bg-zinc-800/75 backdrop-blur-md text-zinc-300 p-4 grow-0 basis-4/6 shadow-2xl shadow-zinc-600'>
									<h2 className='text-3xl font-bold uppercase'>{imageData[carouselIndex].title}</h2>
									<p className='font-normal text-xl '>{imageData[carouselIndex].description}</p>
								</div>
							</div>
						</div>
					</div>
				</Carousel>
			)}
		</>
	);
}

/*

*/

/*
<p>{data[carouselIndex].id}</p>
						<div className='flex gap-6'>

						</div>


						*/
