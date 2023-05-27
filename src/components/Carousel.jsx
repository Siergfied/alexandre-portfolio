import React from 'react';

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

	const button = 'flex justify-center items-center gap-4 w-16 h-16 text-zinc-200 bg-zinc-800 hover:bg-zinc-600 active:bg-zinc-400 transition ease-in-out duration-250';

	return (
		<>
			{children}

			<>
				<div className='absolute pl-4 flex h-full items-center left-0'>
					<button className={button} onClick={onPrevious}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-12 w-12'>
							<path d='M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z' fill='#FFF'></path>
						</svg>
					</button>
				</div>

				<div className='absolute pr-4 flex h-full items-center right-0'>
					<button className={button} onClick={onNext}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-12 w-12'>
							<path d='M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z' fill='#FFF'></path>
						</svg>
					</button>
				</div>
			</>
		</>
	);
}

/*
const button = 'flex justify-center items-center gap-4 w-40 text-zinc-200 bg-zinc-800 hover:bg-zinc-600 active:bg-zinc-400 transition ease-in-out duration-250';

	return (
		<>
			{children}

			<div className='absolute flex gap-8 w-full h-12 bottom-12 justify-end pr-24'>
				<button className={button} onClick={onPrevious}>
					<i className='ri-arrow-left-fill'></i>
					<span>Précédent</span>
				</button>

				<span className='flex justify-center items-center gap-4 w-20 text-zinc-200 bg-zinc-800'>
					{carouselIndex + 1} / {array.length}
				</span>

				<button className={button} onClick={onNext}>
					<span>Suivant</span>
					<i className='ri-arrow-right-fill '></i>
				</button>
			</div>
		</>
	);
				*/
