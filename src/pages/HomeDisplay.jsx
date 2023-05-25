import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

export default function HomeDisplay() {
	const [homeData, setHomeData] = useState([]);

	const fetchHomeData = async () => {
		const data = await getDocs(collection(db, 'homes'));

		let homeArray = [];
		data.forEach((doc) => {
			homeArray.unshift({ ...doc.data() });
		});
		setHomeData(homeArray);
	};

	useEffect(() => {
		fetchHomeData();
		document.title = 'Alexandre Fourcoux';
	}, []);

	return (
		<div className='flex h-full px-24 py-12 justify-center'>
			{homeData[0] && (
				<div className='flex flex-col w-3/4 text-zinc-200 mt-20 mb-auto'>
					<h1 className='text-7xl font-bold uppercase'>{homeData[0].title} </h1>
					<p className='font-normal text-3xl mt-16'>{homeData[0].description}</p>
				</div>
			)}
		</div>
	);
}
