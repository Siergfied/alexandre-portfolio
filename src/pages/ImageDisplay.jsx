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
			<p>Image Display</p>

			<div className='mt-6'>
				{data[carouselIndex] && (
					<Carousel array={data} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex}>
						<>
							<p>{data[carouselIndex].id}</p>
							<p>{data[carouselIndex].cover}</p>
							<p>{data[carouselIndex].background}</p>
							<p>{data[carouselIndex].title}</p>
							<p>{data[carouselIndex].description}</p>
						</>
					</Carousel>
				)}
			</div>
		</>
	);
}

/*
<div className='flex gap-6 w-full justify-around'>
				<button
					className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
					onClick={onPrevious}
				>
					Previous
				</button>
				<p>Carousel Index : {carouselIndex} </p>
				<p>Array length : {data.length}</p>
				<button
					className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
					onClick={onNext}
				>
					Next
				</button>
			</div>

			<div className=''>
				{data[carouselIndex] && (
					<>
						<p>{data[carouselIndex].id}</p>
						<p>{data[carouselIndex].cover}</p>
						<p>{data[carouselIndex].background}</p>
						<p>{data[carouselIndex].title}</p>
						<p>{data[carouselIndex].descritpion}</p>
					</>
				)}
			</div>
			*/
