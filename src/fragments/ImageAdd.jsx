import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';

import ImageForm from '../components/ImageForm.jsx';

import storeImageFile from '../functions/storeImageFile.js';

export default function ImageAdd({ stateChanger }) {
	const [formSubmit, setFormSubmit] = useState(false);

	const [coverImage, setCoverImage] = useState();
	const [backgroundImage, setBackgroundImage] = useState();

	const clearForm = () => {
		document.querySelector('#upload_title').value = '';
		document.querySelector('#upload_description').value = '';
		setCoverImage();
		setBackgroundImage();
	};

	const storeImage = async (event) => {
		if (formSubmit) return;

		setFormSubmit(true);

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());
		formJson.id = Date.now().toString();
		formJson.cover = await storeImageFile(coverImage.file, 'images', formJson.id + '_cover');
		formJson.background = await storeImageFile(backgroundImage.file, 'images', formJson.id + '_background');

		await setDoc(doc(db, 'images', formJson.id), formJson);

		clearForm();
		stateChanger();
		setFormSubmit(false);
	};

	return (
		<>
			<ImageForm
				id={'upload'}
				formAction={storeImage}
				disabled={false}
				coverImageCropped={coverImage}
				setCoverImageCropped={setCoverImage}
				backgroundImageCropped={backgroundImage}
				setBackgroundImageCropped={setBackgroundImage}
			>
				<button
					type='submit'
					disabled={formSubmit}
					className='inline-flex items-center justify-center px-4 py-2 w-28 bg-zinc-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-700 focus:bg-zinc-700 active:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
				>
					Ajouter
				</button>
			</ImageForm>
		</>
	);
}
