import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';

import CategoryForm from '../components/CategoryForm.jsx';

import storeImageFile from '../functions/storeImageFile.js';

export default function CategoryAdd({ stateChanger }) {
	const [formSubmit, setFormSubmit] = useState(false);

	const [iconImage, setIconImage] = useState();

	const clearForm = () => {
		document.querySelector('#upload_title').value = '';
		setIconImage();
	};

	const storeCategory = async (event) => {
		if (formSubmit) return;

		setFormSubmit(true);

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		formJson.id = Date.now().toString();
		formJson.icon = await storeImageFile(formJson.icon, 'icons', formJson.id);

		await setDoc(doc(db, 'categories', formJson.id), formJson);

		clearForm();
		stateChanger();
		setFormSubmit(false);
	};

	return (
		<>
			<CategoryForm id={'upload'} formAction={storeCategory} disabled={false} icon={iconImage} setIcon={setIconImage}>
				<button
					type='submit'
					disabled={formSubmit}
					className='inline-flex items-center justify-center px-4 py-2 w-28 bg-zinc-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-700 focus:bg-zinc-700 active:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
				>
					Ajouter
				</button>
			</CategoryForm>
		</>
	);
}
