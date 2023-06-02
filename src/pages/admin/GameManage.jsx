import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import GameUpdate from '../../fragments/GameUpdate.jsx';
import IconAdd from '../../fragments/IconAdd.jsx';
import IconUpdateAndDelete from '../../fragments/IconUpdateAndDelete.jsx';

import { h2Style } from '../../layouts/Style.jsx';

export default function GameManage() {
	const [gameData, setGameData] = useState([]);
	const [categoryData, setCategoryData] = useState([]);
	const [dataChanged, setDataChanged] = useState(false);

	const handleDataChanged = () => {
		setDataChanged(true);
	};

	const fetchCategoryData = async () => {
		const data = await getDocs(query(collection(db, 'categories'), orderBy('order')));

		const categoryArray = [];
		data.forEach((doc) => {
			categoryArray.push(doc.data());
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
		document.title = 'Game - Admin - AF';
	}, [dataChanged]);

	return (
		<div className='flex h-full gap-10 border-8 border-[#8759B4] rounded-sm bg-zinc-700 p-4 overflow-auto'>
			<div className='flex w-1/2'>
				<div className='w-full'>
					<h2 className={h2Style}>Editer la démo</h2>
					{gameData.map(({ id, url, title, description, category }) => (
						<GameUpdate
							key={id}
							id={id}
							url={url}
							title={title}
							description={description}
							category={category}
							categoryList={categoryData}
							stateChanger={handleDataChanged}
						/>
					))}
				</div>
			</div>

			<div className='flex w-1/2 overflow-y-auto'>
				<div className='w-full'>
					<div>
						<h2 className={h2Style}>Ajouter une catégorie</h2>
						<div className='pr-4'>
							<IconAdd stateChanger={handleDataChanged} name={'categories'} folder={'categories_icons'} iconsDocuments={categoryData} />
						</div>
					</div>

					{categoryData.length != 0 && (
						<div className='mt-2'>
							<h2 className={h2Style}>Editer les catégories</h2>
							<ul className='flex flex-col w-full gap-4 pr-4'>
								{categoryData.map(({ id, order, title, icon }) => (
									<li key={id + order}>
										<IconUpdateAndDelete
											id={id}
											order={order}
											title={title}
											icon={icon}
											stateChanger={handleDataChanged}
											name={'categories'}
											folder={'categories_icons'}
											iconsDocuments={categoryData}
										/>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
