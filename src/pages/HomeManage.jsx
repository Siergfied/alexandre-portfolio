import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

import HomeUpdate from '../fragments/HomeUpdate';

export default function HomeDisplay() {
	const [homeData, setHomeData] = useState([]);
	const [dataChanged, setDataChanged] = useState(false);

	const handleDataChanged = () => {
		setDataChanged(true);
	};

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
		setDataChanged(false);
		document.title = 'Home - Admin - AF';
	}, [dataChanged]);

	const h2Style = 'flex items-center whitespace-nowrap justify-between gap-4 py-4 px-4 font-medium text-zinc-200 before:block before:w-full before:border before:bg-zinc-200 after:block after:w-full after:border after:bg-zinc-200';

	return (
		<div className='flex gap-24 px-24'>
			<div className='w-full'>
				<h2 className={h2Style}>Editer le contenu de la page d'accueil</h2>
				{homeData.map(({ id, title, description }) => (
					<HomeUpdate key={id} id={id} title={title} description={description} stateChanger={handleDataChanged} />
				))}
			</div>
		</div>
	);
}
