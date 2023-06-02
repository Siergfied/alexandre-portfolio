import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import ImageAdd from '../../fragments/ImageAdd.jsx';
import ImageUpdateAndDelete from '../../fragments/ImageUpdateAndDelete.jsx';

import { h2Style } from '../../layouts/Style.jsx';

export default function ImageManage() {
	const [imageData, setImageData] = useState([]);
	const [dataChanged, setDataChanged] = useState(false);

	const handleDataChanged = () => {
		setDataChanged(true);
	};

	const fetchImageData = async () => {
		const data = await getDocs(query(collection(db, 'images'), orderBy('order')));

		const imageArray = [];
		data.forEach((doc) => {
			imageArray.push(doc.data());
		});

		setImageData(imageArray);
	};

	useEffect(() => {
		fetchImageData();
		setDataChanged(false);
		document.title = 'Image - Admin - AF';
	}, [dataChanged]);

	return (
		<>
			<div className='border-8 border-[#8759B4] rounded-sm bg-zinc-700 p-4 overflow-auto'>
				<div>
					<h2 className={h2Style}>Ajouter une image</h2>
					<ImageAdd stateChanger={handleDataChanged} imagesDocuments={imageData} />
				</div>

				{imageData.length != 0 && (
					<div className='mt-2'>
						<h2 className={h2Style}>Modifier les images</h2>
						<ul className='flex flex-col w-full gap-4'>
							{imageData.map(({ id, order, cover, background, title, description }) => (
								<li key={id + order}>
									<ImageUpdateAndDelete
										id={id}
										order={order}
										cover={cover}
										background={background}
										title={title}
										description={description}
										stateChanger={handleDataChanged}
										imagesDocuments={imageData}
									/>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
