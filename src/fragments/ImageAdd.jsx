import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';

import ImageForm from '../components/forms/ImageForm.jsx';

import storeImageFile from '../functions/storeImageFile.js';
import Order from '../functions/orderHandler.js';

import { buttonStylePrimary } from '../layouts/Style.jsx';

export default function ImageAdd({ stateChanger, imagesDocuments }) {
	const [formSubmit, setFormSubmit] = useState(false);

	const [imageOrder, setImageOrder] = useState(1);
	const [imageTitle, setImageTitle] = useState('');
	const [imageDescription, setImageDescription] = useState('');
	const [imageCover, setImageCover] = useState();
	const [imageBackground, setImageBackground] = useState();

	const clearForm = () => {
		setImageOrder(1);
		setImageTitle('');
		setImageDescription('');
		setImageCover();
		setImageBackground();
	};

	const storeImage = async (event) => {
		if (formSubmit) return;

		setFormSubmit(true);

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		formJson.id = Date.now().toString();
		formJson.order = Number(formJson.order);
		formJson.cover = await storeImageFile(imageCover.file, 'images', formJson.id + '_cover');
		formJson.background = await storeImageFile(imageBackground.file, 'images', formJson.id + '_background');

		Order.onNew(imagesDocuments, 'images', formJson.order);

		await setDoc(doc(db, 'images', formJson.id), formJson);

		clearForm();
		stateChanger();
		setFormSubmit(false);
	};

	return (
		<>
			<ImageForm
				id={'upload'}
				order={imageOrder}
				setOrder={setImageOrder}
				maxOrder={imagesDocuments.length + 1}
				title={imageTitle}
				setTitle={setImageTitle}
				description={imageDescription}
				setDescription={setImageDescription}
				coverImageCropped={imageCover}
				setCoverImageCropped={setImageCover}
				backgroundImageCropped={imageBackground}
				setBackgroundImageCropped={setImageBackground}
				formAction={storeImage}
				disabled={false}
			>
				<button type='submit' disabled={formSubmit} className={buttonStylePrimary}>
					Ajouter
				</button>
			</ImageForm>
		</>
	);
}
