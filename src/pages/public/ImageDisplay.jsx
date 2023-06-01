import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import Carousel from '../../components/Carousel.jsx';

export default function ImageDisplay() {
	const [imageData, setImageData] = useState([]);

	const fetchImageData = async () => {
		const data = await getDocs(query(collection(db, 'images'), orderBy('order')));

		const imageArray = [];
		data.forEach((doc) => {
			imageArray.push(doc.data());
		});

		setImageData(imageArray);
	};

	useEffect(() => {
		fetchImageData();
		document.title = 'Réalisations - AF';
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

	const setClass = (number) => {
		const classArray = ['absolute w-full h-full '];

		switch (number) {
			case carouselIndex:
				classArray.push('duration-700 ease-in-out visible opacity-100');
				break;
			case previousCarouselIndex(carouselIndex, imageData.length):
				classArray.push('visible duration-700 ease-in-out -translate-x-full opacity-0');
				break;
			case nextCarouselIndex(carouselIndex, imageData.length):
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
			<h1 className='invisible hidden'>Réalisations</h1>
			<Carousel array={imageData} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex}>
				<div className='h-full w-full'>
					<div className='h-full w-full relative overflow-hidden border-8 border-[#8759B4] rounded'>
						{imageData.map(({ id, cover, background, title, description }, index) => (
							<div className={setClass(index)} key={id}>
								<img src={background} alt='' className='w-full h-full object-cover blur-sm' />
								<div className='absolute top-0 left-0 flex h-full py-12 px-44 justify-between gap-24 '>
									<img src={cover} alt='' className='max-h-full h-auto max-w-full w-auto border-8 border-zinc-800 rounded' />

									<div className='flex flex-col gap-12 h-fit border-8 border-zinc-800 bg-zinc-800/70 backdrop-blur-md p-4 grow-0 basis-4/6 rounded'>
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
