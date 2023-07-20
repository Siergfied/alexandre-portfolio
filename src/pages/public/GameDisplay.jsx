import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { isMobile } from 'react-device-detect';

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
		<div className='h-full w-full relative overflow-hidden border-4 sm:border-8 border-[#8759B4] rounded-sm lg:px-16 lg:py-12 p-4 bg-zinc-700 overflow-y-auto'>
			<h1 className='invisible hidden'>Démo</h1>
			{isMobile && <p className='text-3xl text-center'>Désoler, cette page est indisponible sur mobile.</p>}
			{!isMobile && (
				<>
					{gameData[0] && (
						<div className='flex h-full w-full lg:gap-16 gap-4 flex-col lg:flex-row'>
							<div className='flex border-8 border-zinc-800 rounded-sm lg:w-2/3 w-full h-fit max-h-full'>
								<iframe
									src={'https://i.simmer.io/' + gameData[0].url.split('https://sharemygame.com/').join('')}
									className='w-full aspect-[16/10]'
								></iframe>
							</div>

							<div className='flex flex-col lg:gap-12 gap-4 lg:w-1/3 h-fit border-8 border-zinc-800 bg-zinc-800/75 backdrop-blur-md text-zinc-300 p-4 rounded-sm'>
								<h2 className='text-3xl font-bold uppercase'>{gameData[0].title} </h2>
								<p className='font-normal text-xl '>{gameData[0].description}</p>
								<ul className='flex flex-wrap gap-4'>
									{categoryData.map(({ id, title, icon }) =>
										gameData[0].category.includes(id) ? (
											<li
												key={id}
												className='flex items-center justify-center gap-2 py-2 h-10 w-40 bg-zinc-800 rounded-md border-2 border-[#8759B4]'
											>
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
				</>
			)}
		</div>
	);
}
