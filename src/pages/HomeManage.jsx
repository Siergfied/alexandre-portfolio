import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

import HomeUpdate from '../fragments/HomeUpdate';

import IconAdd from '../fragments/IconAdd.jsx';
import IconUpdateAndDelete from '../fragments/IconUpdateAndDelete.jsx';

import LinkAdd from '../fragments/LinkAdd.jsx';
import LinkUpdateAndDelete from '../fragments/LinkUpdateAndDelete.jsx';

export default function HomeDisplay() {
	const [homeData, setHomeData] = useState([]);
	const [langageData, setLangageData] = useState([]);
	const [linkData, setLinkData] = useState([]);
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

	const fetchLangageData = async () => {
		const data = await getDocs(collection(db, 'langages'));

		let categoryArray = [];
		data.forEach((doc) => {
			categoryArray.unshift({ ...doc.data() });
		});
		setLangageData(categoryArray);
	};

	const fetchLinkData = async () => {
		const data = await getDocs(collection(db, 'links'));

		let categoryArray = [];
		data.forEach((doc) => {
			categoryArray.unshift({ ...doc.data() });
		});
		setLinkData(categoryArray);
	};

	useEffect(() => {
		fetchHomeData();
		fetchLangageData();
		fetchLinkData();
		setDataChanged(false);
		document.title = 'Home - Admin - AF';
	}, [dataChanged]);

	const h2Style = 'flex items-center whitespace-nowrap justify-between gap-4 py-4 px-4 font-medium text-zinc-200 before:block before:w-full before:border before:bg-zinc-200 after:block after:w-full after:border after:bg-zinc-200';

	return (
		<div className='flex w-full pl-4 gap-12 h-full overflow-hidden'>
			<div className='w-1/3'>
				<div className='flex flex-col h-full pr-4'>
					<h2 className={h2Style}>Editer le texte de la page d'accueil</h2>
					{homeData.map(({ id, title, description }) => (
						<HomeUpdate key={id} id={id} title={title} description={description} stateChanger={handleDataChanged} />
					))}
				</div>
			</div>

			<div className='w-1/3 overflow-y-auto'>
				<div className='flex flex-col w-full'>
					<div>
						<h2 className={h2Style}>Ajouter un langage</h2>
						<div className='pr-4'>
							<IconAdd stateChanger={handleDataChanged} name={'langages'} folder={'langages_icons'} />
						</div>
					</div>

					<div className='mt-4'>
						{langageData.length != 0 && (
							<>
								<h2 className={h2Style}>Editer les langages</h2>
								<ul className='flex flex-col w-full gap-6 pr-4'>
									{langageData.map(({ id, title, icon }) => (
										<li key={id}>
											<IconUpdateAndDelete id={id} icon={icon} title={title} stateChanger={handleDataChanged} name={'langages'} folder={'langages_icons'} />
										</li>
									))}
								</ul>
							</>
						)}
					</div>
				</div>
			</div>

			<div className='w-1/3 overflow-y-auto'>
				<div className='flex flex-col w-full'>
					<div>
						<h2 className={h2Style}>Ajouter un lien</h2>
						<div className='pr-4'>
							<LinkAdd stateChanger={handleDataChanged} name={'links'} folder={'links_icons'} />
						</div>
					</div>

					<div className='mt-4 '>
						{linkData.length != 0 && (
							<>
								<h2 className={h2Style}>Editer les liens</h2>
								<ul className='flex flex-col w-full gap-6 pr-4'>
									{linkData.map(({ id, icon, title, url }) => (
										<li key={id}>
											<LinkUpdateAndDelete id={id} icon={icon} title={title} url={url} stateChanger={handleDataChanged} name={'links'} folder={'links_icons'} />
										</li>
									))}
								</ul>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
