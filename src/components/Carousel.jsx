import React from 'react';

import '../index.css';

export default function Carousel({ array, carouselIndex, setCarouselIndex, children }) {
	const carouselIndexMax = array.length - 1;

	const onNext = () => {
		if (carouselIndex === carouselIndexMax) {
			setCarouselIndex(0);
		} else {
			setCarouselIndex(carouselIndex + 1);
		}
	};

	const onPrevious = () => {
		if (carouselIndex === 0) {
			setCarouselIndex(carouselIndexMax);
		} else {
			setCarouselIndex(carouselIndex - 1);
		}
	};

	const buttonStyle = 'flex justify-center items-center gap-4 w-12 h-12 bg-[#8759B4] hover:bg-[#9369bb] active:bg-[#9f7ac3] transition ease-in-out duration-250 rounded ';

	return (
		<>
			{children}

			<>
				<div className='absolute pl-4 flex h-full items-center left-0'>
					<button className={buttonStyle} onClick={onPrevious} aria-label='Carousel précédent'>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
							<path d='M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z' fill='#F5F3FF'></path>
						</svg>
					</button>
				</div>

				<div className='absolute pr-4 flex h-full items-center right-0'>
					<button className={buttonStyle + 'rotate-180'} onClick={onNext} aria-label='Carousel suivant'>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
							<path d='M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z' fill='#F5F3FF'></path>
						</svg>
					</button>
				</div>
			</>
		</>
	);
}
