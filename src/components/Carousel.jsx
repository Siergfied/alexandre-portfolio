import React from 'react';

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

	const buttonStyle = 'flex justify-center items-center gap-4 w-12 h-12 bg-[#8759B4] hover:bg-violet-400 active:bg-violet-300 transition ease-in-out duration-250';

	return (
		<>
			{children}

			<>
				<div className='absolute pl-4 flex h-full items-center left-0'>
					<button className={buttonStyle} onClick={onPrevious}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='flex justify-center'>
							<path d='M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z' fill='#FFF'></path>
						</svg>
					</button>
				</div>

				<div className='absolute pr-4 flex h-full items-center right-0'>
					<button className={buttonStyle} onClick={onNext}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className=''>
							<path d='M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z' fill='#FFF'></path>
						</svg>
					</button>
				</div>
			</>
		</>
	);
}
