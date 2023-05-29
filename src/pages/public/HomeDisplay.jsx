import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

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
		<div className='flex flex-col h-full pt-24 text-zinc-200'>
			{homeData[0] && <h1 className='text-7xl font-bold uppercase px-48'>{homeData[0].title} </h1>}

			<div className='flex flex-row gap-24 px-24 mt-12'>
				<div className='w-1/2'>{homeData[0] && <p className='font-normal text-2xl text-justify mt-8'>{homeData[0].description}</p>}</div>
				<div className='w-1/2'>
					<ul className='flex gap-4 flex-wrap mt-8'>
						{langagesData.map(({ id, icon, title }) => (
							<li key={id} className='flex flex-row items-center p-1.5 gap-1.5 border border-transparent bg-zinc-700'>
								<img src={icon} className='h-10 w-10' />
								<span className='text-lg font-medium'>{title}</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className='flex w-full gap-4 mt-auto mb-0'>
				{linksData.map(({ id, icon, title, url }) => (
					<a key={id} href={url} className='flex flex-row items-center p-1 gap-1 h-full border border-transparent bg-zinc-700 hover:bg-zinc-600'>
						<img src={icon} className='h-6 w-6' />
						<span className=''>{title}</span>
					</a>
				))}
			</div>
		</div>
	);
}
