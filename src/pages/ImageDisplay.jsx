import React, { useState, useEffect } from 'react';

import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

import Carousel from '../components/Carousel.jsx';

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

	const [carouselIndex, setCarouselIndex] = useState(0);

	return (
		<>
			{data[carouselIndex] && (
				<Carousel array={data} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex}>
					<div className='flex h-full overflow-hidden'>
						<div className='flex h-full w-full relative'>
							<img src={data[carouselIndex].background} alt={data[carouselIndex].title} className='w-full h-full object-cover blur-sm' />
							<div className='absolute flex h-full py-12 px-44 justify-between gap-24'>
								<img src={data[carouselIndex].cover} alt={data[carouselIndex].title} className='max-h-full h-auto max-w-full w-auto border-8 border-zinc-800' />

								<div className='flex flex-col gap-12 h-fit border-8 border-zinc-800 bg-zinc-800/75 backdrop-blur-md text-zinc-300 p-4 grow-0 basis-4/6'>
									<p className='text-3xl font-bold uppercase'>{data[carouselIndex].title}</p>
									<p className='font-normal text-xl '>{data[carouselIndex].description}</p>
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
