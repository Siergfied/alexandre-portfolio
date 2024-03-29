import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

import textAreaDisplay from '../../functions/textAreaDisplay.jsx';

export default function HomeDisplay() {
	const [homeData, setHomeData] = useState([]);
	const [langagesData, setLangagesData] = useState([]);
	const [linksData, setLinksData] = useState([]);

	const fetchHomeData = async () => {
		const data = await getDocs(collection(db, 'homes'));

		let homeArray = [];
		data.forEach((doc) => {
			homeArray.unshift({ ...doc.data() });
		});
		setHomeData(homeArray);
	};

	const fetchLangagesData = async () => {
		const data = await getDocs(collection(db, 'langages'));

		let langagesArray = [];
		data.forEach((doc) => {
			langagesArray.unshift({ ...doc.data() });
		});
		setLangagesData(langagesArray);
	};

	const fetchLinksData = async () => {
		const data = await getDocs(collection(db, 'links'));

		let linksArray = [];
		data.forEach((doc) => {
			linksArray.unshift({ ...doc.data() });
		});
		setLinksData(linksArray);
	};

	useEffect(() => {
		fetchHomeData();
		fetchLangagesData();
		fetchLinksData();
		document.title = 'Alexandre Fourcoux';
	}, []);

	return (
		<div className='flex flex-col h-full xl:pt-24 lg:pt-12 pt-4'>
			{homeData[0] && (
				<h1 className='xl:text-7xl md:text-5xl text-4xl text-center flex justify-center md:justify-start font-bold uppercase xl:px-24 lg:px-12 px-8'>
					{homeData[0].title}
				</h1>
			)}

			<div className='flex md:flex-row flex-col justify-evenly mt-12 xl:px-24 lg:px-12 px-8 xl:gap-24 lg:gap-12 gap-8 h-full mb-8'>
				<div className='md:w-1/2 sm:w-full h-full'>
					{homeData[0] && (
						<p className='font-normal sm:text-2xl text-base text-justify w-full h-full bg-transparent resize-none border-0 '>
							{textAreaDisplay(homeData[0].description)}
						</p>
					)}
				</div>
				<div className='md:w-1/2 sm:w-full'>
					<ul className='flex gap-4 flex-wrap '>
						{langagesData.map(({ id, icon, title }) => (
							<li
								key={id}
								className='flex flex-row items-center sm:py-1.5 py-0.5 px-1.5 gap-1.5 border border-transparent bg-zinc-700 rounded'
							>
								<img src={icon} alt='' className='md:h-10 md:w-10 h-6 w-6' />
								<span className='text-lg font-medium'>{title}</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className='flex w-full mt-auto mb-0 gap-4 justify-center sm:justify-start'>
				{linksData.map(({ id, icon, title, url }) => (
					<a key={id} href={url} target='_blank' className='flex flex-row items-center px-0.5 gap-1.5 h-full rounded hover:bg-zinc-600 '>
						<img src={icon} alt='' className='sm:h-6 sm:w-6 h-8 w-8' aria-label={title} />
						<span className='sm:text-xl sm:flex hidden'>{title}</span>
					</a>
				))}
			</div>
		</div>
	);
}
