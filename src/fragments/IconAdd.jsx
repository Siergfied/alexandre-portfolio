import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';

import IconForm from '../components/forms/IconForm.jsx';

import storeImageFile from '../functions/storeImageFile.js';
import Order from '../functions/orderHandler.js';

import { buttonStylePrimary } from '../layouts/Style.jsx';

export default function IconAdd({ stateChanger, name, folder, iconsDocuments }) {
	const [formSubmit, setFormSubmit] = useState(false);

	const [iconOrder, setIconOrder] = useState(1);
	const [iconImage, setIconImage] = useState();
	const [iconTitle, setIconTitle] = useState('');

	const clearForm = () => {
		setIconTitle('');
		setIconImage();
	};

	const storeIcon = async (event) => {
		if (formSubmit) return;

		setFormSubmit(true);

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		formJson.id = Date.now().toString();
		formJson.order = Number(formJson.order);
		formJson.icon = await storeImageFile(formJson.icon, folder, formJson.id);

		Order.onNew(iconsDocuments, name, formJson.order);

		await setDoc(doc(db, name, formJson.id), formJson);

		clearForm();
		stateChanger();
		setFormSubmit(false);
	};

	return (
		<>
			<IconForm
				id={name}
				order={iconOrder}
				setOrder={setIconOrder}
				maxOrder={iconsDocuments.length + 1}
				icon={iconImage}
				setIcon={setIconImage}
				title={iconTitle}
				setTitle={setIconTitle}
				disabled={formSubmit}
				formAction={storeIcon}
			>
				<button type='submit' disabled={formSubmit} className={buttonStylePrimary}>
					Ajouter
				</button>
			</IconForm>
		</>
	);
}
