import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import HomeUpdate from '../../fragments/HomeUpdate.jsx';

import IconAdd from '../../fragments/IconAdd.jsx';
import IconUpdateAndDelete from '../../fragments/IconUpdateAndDelete.jsx';

import LinkAdd from '../../fragments/LinkAdd.jsx';
import LinkUpdateAndDelete from '../../fragments/LinkUpdateAndDelete.jsx';

import { h2Style } from '../../layouts/Style.jsx';

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
		const data = await getDocs(query(collection(db, 'langages'), orderBy('order')));

		const langageArray = [];
		data.forEach((doc) => {
			langageArray.push(doc.data());
		});

		setLangageData(langageArray);
	};

	const fetchLinkData = async () => {
		const data = await getDocs(query(collection(db, 'links'), orderBy('order')));

		const linkArray = [];
		data.forEach((doc) => {
			linkArray.push(doc.data());
		});

		setLinkData(linkArray);
	};

	useEffect(() => {
		fetchHomeData();
		fetchLangageData();
		fetchLinkData();
		setDataChanged(false);
		document.title = 'Home - Admin - AF';
	}, [dataChanged]);

	return (
		<div className='flex flex-col w-full h-full pl-4 gap-6 overflow-hidden'>
			<div className='flex flex-col w-full'>
				<h2 className={h2Style}>Editer le texte</h2>
				{homeData.map(({ id, title, description }) => (
					<HomeUpdate key={id} id={id} title={title} description={description} stateChanger={handleDataChanged} />
				))}
			</div>

			<div className='w-full flex flex-row gap-6 overflow-auto'>
				<div className='flex flex-col w-1/2 overflow-y-auto'>
					<div>
						<h2 className={h2Style}>Ajouter un langage</h2>
						<div className='pr-4'>
							<IconAdd stateChanger={handleDataChanged} name={'langages'} folder={'langages_icons'} iconsDocuments={langageData} />
						</div>
					</div>

					{langageData.length != 0 && (
						<div className='mt-4'>
							<h2 className={h2Style}>Editer les langages</h2>
							<ul className='flex flex-col w-full gap-6 pr-4'>
								{langageData.map(({ id, order, title, icon }) => (
									<li key={id + order}>
										<IconUpdateAndDelete
											id={id}
											order={order}
											icon={icon}
											title={title}
											stateChanger={handleDataChanged}
											name={'langages'}
											folder={'langages_icons'}
											iconsDocuments={langageData}
										/>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>

				<div className='w-1/2 overflow-y-auto'>
					<div className='flex flex-col w-full'>
						<div>
							<h2 className={h2Style}>Ajouter un lien</h2>
							<div className='pr-4'>
								<LinkAdd stateChanger={handleDataChanged} name={'links'} folder={'links_icons'} linksDocuments={linkData} />
							</div>
						</div>

						{linkData.length != 0 && (
							<div className='mt-4 '>
								<h2 className={h2Style}>Editer les liens</h2>
								<ul className='flex flex-col w-full gap-6 pr-4'>
									{linkData.map(({ id, order, icon, title, url }) => (
										<li key={id + order}>
											<LinkUpdateAndDelete
												id={id}
												order={order}
												icon={icon}
												title={title}
												url={url}
												stateChanger={handleDataChanged}
												name={'links'}
												folder={'links_icons'}
												linksDocuments={linkData}
											/>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
