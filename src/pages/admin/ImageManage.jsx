import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import ImageAdd from '../../fragments/ImageAdd.jsx';
import ImageUpdateAndDelete from '../../fragments/ImageUpdateAndDelete.jsx';

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

	const h2Style = 'flex items-center whitespace-nowrap justify-between gap-4 py-4 px-4 font-medium text-zinc-200 before:block before:w-full before:border before:bg-zinc-200 after:block after:w-full after:border after:bg-zinc-200';

	return (
		<>
			<div className='px-4'>
				<div>
					<h2 className={h2Style}>Ajouter une image</h2>
					<ImageAdd stateChanger={handleDataChanged} imagesDocuments={imageData} />
				</div>

				<div className='mt-4'>
					<h2 className={h2Style}>Modifier les images</h2>
					<ul className='flex flex-col w-full gap-6'>
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
			</div>
		</>
	);
}
