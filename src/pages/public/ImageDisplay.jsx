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
					<div className='h-full w-full relative overflow-hidden border-4 lg:border-8 border-[#8759B4] rounded'>
						{imageData.map(({ id, cover, background, title, description }, index) => (
							<div className={setClass(index)} key={id}>
								<img src={background} alt='' className='w-full h-full object-cover blur-sm absolute sm:block hidden' />
								<div className='flex h-full justify-around lg:py-12 xl:px-24 lg:px-10 xl:gap-24 lg:gap-8 gap-8 relative'>
									<img src={cover} alt='' className='aspect-[3/4] border-8 border-zinc-800 rounded absolute lg:relative' />

									<div className='flex flex-col xl:gap-12 sm:gap-4 lg:h-fit border-8 border-zinc-800 lg:bg-zinc-800/70 bg-zinc-800/90 backdrop-blur-md py-4 lg:px-4 px-10 grow-0 rounded lg:relative absolute bottom-0 h-2/5 overflow-y-auto'>
										<h2 className='xl:text-3xl lg:text-xl text-base font-bold uppercase'>{title}</h2>
										<p className='font-normal lg:text-xl text-base '>{description}</p>
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
