import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

import CategoryAdd from '../fragments/CategoryAdd.jsx';
import CategoryUpdateAndDelete from '../fragments/CategoryUpdateAndDelete.jsx';

import GameUpdate from '../fragments/GameUpdate.jsx';

export default function GameManage() {
	const [gameData, setGameData] = useState([]);
	const [categoryData, setCategoryData] = useState([]);
	const [dataChanged, setDataChanged] = useState(false);

	const handleDataChanged = () => {
		setDataChanged(true);
	};

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
		fetchCategoryData();
		fetchGameData();
		setDataChanged(false);
	}, [dataChanged]);

	const h2Style = 'flex items-center whitespace-nowrap justify-between gap-4 py-4 px-4 font-medium text-zinc-200 before:block before:w-full before:border before:bg-zinc-200 after:block after:w-full after:border after:bg-zinc-200';

	return (
		<div className='flex gap-24 pl-24 pr-20 overflow-hidden'>
			<div className='flex w-1/2'>
				<div className='w-full'>
					<h2 className={h2Style}>Editer le jeu</h2>
					{gameData.map(({ id, url, title, description, category }) => (
						<GameUpdate key={id} id={id} url={url} title={title} description={description} category={category} categoryList={categoryData} stateChanger={handleDataChanged} />
					))}
				</div>
			</div>

			<div className='flex w-1/2 overflow-y-auto'>
				<div className='w-full'>
					<div>
						<h2 className={h2Style}>Ajouter une catégorie</h2>
						<div className='pr-4'>
							<CategoryAdd stateChanger={handleDataChanged} />
						</div>
					</div>

					<div className='mt-4'>
						<h2 className={h2Style}>Editer les catégories</h2>
						<ul className='flex flex-col w-full gap-6 pr-4'>
							{categoryData.map(({ id, title, icon }) => (
								<li key={id}>
									<CategoryUpdateAndDelete id={id} title={title} icon={icon} stateChanger={handleDataChanged} />
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
