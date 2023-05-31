import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';

import LinkForm from '../components/LinkForm.jsx';

import storeImageFile from '../functions/storeImageFile.js';

import { buttonStylePrimary } from '../components/ButtonStyle.jsx';

export default function LinkAdd({ stateChanger, name, folder }) {
	const [formSubmit, setFormSubmit] = useState(false);

	const [iconImage, setIconImage] = useState();

	const clearForm = () => {
		document.querySelector('#title_' + name).value = '';
		document.querySelector('#url' + name).value = '';
		setIconImage();
	};

	const storeIcon = async (event) => {
		if (formSubmit) return;

		setFormSubmit(true);

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		formJson.id = Date.now().toString();
		formJson.icon = await storeImageFile(formJson.icon, folder, formJson.id);

		await setDoc(doc(db, name, formJson.id), formJson);

		clearForm();
		stateChanger();
		setFormSubmit(false);
	};

	return (
		<>
			<LinkForm id={name} formAction={storeIcon} disabled={false} icon={iconImage} setIcon={setIconImage}>
				<button type='submit' disabled={formSubmit} className={buttonStylePrimary}>
					Ajouter
				</button>
			</LinkForm>
		</>
	);
}
