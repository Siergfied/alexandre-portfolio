import React, { useState, useEffect } from 'react';

import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

import ImageAdd from '../fragments/ImageAdd.jsx';
import ImageUpdateAndDelete from '../fragments/ImageUpdateAndDelete.jsx';

//TODO add field validation and error message

export default function ImageManage() {
	const [imageData, setImageData] = useState([]);
	const [dataChanged, setDataChanged] = useState(false);

	const handleDataChanged = () => {
		setDataChanged(true);
	};

	const fetchImageData = async () => {
		const data = await getDocs(collection(db, 'images'));

		let imageArray = [];
		data.forEach((doc) => {
			imageArray.unshift({ ...doc.data() });
		});
		setImageData(imageArray);
	};

	useEffect(() => {
		fetchImageData();
		setDataChanged(false);
	}, [dataChanged]);

	const h2Style = 'flex items-center whitespace-nowrap justify-between gap-4 py-4 px-4 font-medium text-zinc-200 before:block before:w-full before:border before:bg-zinc-200 after:block after:w-full after:border after:bg-zinc-200';

	return (
		<>
			<div className='px-24'>
				<div>
					<h2 className={h2Style}>Ajouter une image</h2>
					<ImageAdd stateChanger={handleDataChanged} />
				</div>

				<div className='mt-4'>
					<h2 className={h2Style}>Modifier les images</h2>
					<ul className='flex flex-col w-full gap-6'>
						{imageData.map(({ id, cover, background, title, description }) => (
							<li key={id}>
								<ImageUpdateAndDelete id={id} cover={cover} background={background} title={title} description={description} stateChanger={handleDataChanged} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
