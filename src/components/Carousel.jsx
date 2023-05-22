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
						<i className='ri-arrow-left-s-line ri-2x'></i>
					</button>
				</div>

				<div className='absolute pr-4 flex h-full items-center right-0'>
					<button className={button} onClick={onNext}>
						<i className='ri-arrow-right-s-line ri-2x'></i>
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
