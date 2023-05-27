import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

export default function GameDisplay() {
	const [gameData, setGameData] = useState([]);
	const [categoryData, setCategoryData] = useState([]);

	const fetchCategoryData = async () => {
		const data = await getDocs(collection(db, 'categories'));

		let categoryArray = [];
		data.forEach((doc) => {
			categoryArray.unshift({ ...doc.data() });
		});
		setCategoryData(categoryArray);
	};

	const fetchGameData = async () => {
		const data = await getDocs(collection(db, 'games'));

		let gameArray = [];
		data.forEach((doc) => {
			gameArray.unshift({ ...doc.data() });
		});
		setGameData(gameArray);
	};

	useEffect(() => {
		document.title = 'Démo - AF';
		fetchCategoryData();
		fetchGameData();
	}, []);

	return (
		<div className='flex h-full px-24 py-12 bg-gradient-to-b from-zinc-600 via-zinc-600 to-zinc-800'>
			{gameData[0] && (
				<div className='flex h-full w-full gap-24'>
					<div className='flex w-full h-min border-8 border-zinc-800'>
						<iframe src={gameData[0].url} className='aspect-[16/10] w-full'></iframe>
					</div>

					<div className='flex flex-col gap-12 w-1/3 h-fit border-8 border-zinc-800 bg-zinc-800/75 backdrop-blur-md text-zinc-300 p-4 shadow-2xl shadow-zinc-600'>
						<h2 className='text-3xl font-bold uppercase'>{gameData[0].title} </h2>
						<p className='font-normal text-xl '>{gameData[0].description}</p>
						<ul className='flex flex-wrap gap-4'>
							{categoryData.map(({ id, title, icon }) =>
								gameData[0].category.includes(id) ? (
									<li key={id} className='flex items-center justify-center gap-2 py-2 h-10 w-40 bg-zinc-800 rounded-lg'>
										<img src={icon} className='h-8' />
										<span>{title} </span>
									</li>
								) : (
									''
								)
							)}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

/*

<iframe src='https://i.simmer.io/@Siergfied/test' className='aspect-video h-full'></iframe>
*/
