import React, { useState } from 'react';

export default function Carousel({ array, carouselIndex, setCarouselIndex, children }) {
	const onNext = () => {
		if (carouselIndex === array.length - 1) {
			setCarouselIndex(0);
		} else {
			setCarouselIndex(carouselIndex + 1);
		}
	};

	const onPrevious = () => {
		if (carouselIndex === 0) {
			setCarouselIndex(array.length - 1);
		} else {
			setCarouselIndex(carouselIndex - 1);
		}
	};

	return (
		<>
			<div className='flex gap-6 w-full justify-around'>
				<button
					className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
					onClick={onPrevious}
				>
					Previous
				</button>
				<p>Carousel Index : {carouselIndex} </p>
				<p>Array length : {array.length}</p>
				<button
					className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
					onClick={onNext}
				>
					Next
				</button>
			</div>

			<div className='test'>{children}</div>
		</>
	);
}
