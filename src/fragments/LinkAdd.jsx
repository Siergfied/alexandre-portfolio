import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

import LinkForm from '../components/forms/LinkForm.jsx';

import storeImageFile from '../functions/storeImageFile.js';

import { buttonStylePrimary } from '../components/ButtonStyle.jsx';

export default function LinkAdd({ stateChanger, name, folder, linksDocuments }) {
	const [formSubmit, setFormSubmit] = useState(false);

	const [linkOrder, setLinkOrder] = useState(1);
	const [linkIcon, setLinkIcon] = useState();
	const [linkTitle, setLinkTitle] = useState('');
	const [linkUrl, setLinkUrl] = useState('');

	const clearForm = () => {
		setLinkIcon();
		setLinkTitle('');
		setLinkUrl('');
	};

	const storeIcon = async (event) => {
		if (formSubmit) return;

		setFormSubmit(true);

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		formJson.id = Date.now().toString();
		formJson.order = Number(formJson.order);
		formJson.icon = await storeImageFile(formJson.icon, folder, formJson.id);

		linksDocuments.forEach(async (element) => {
			if (element.order >= formJson.order) {
				element.order++;
				await updateDoc(doc(db, name, element.id), element);
			}
		});

		await setDoc(doc(db, name, formJson.id), formJson);

		clearForm();
		stateChanger();
		setFormSubmit(false);
	};

	return (
		<>
			<LinkForm
				id={name}
				order={linkOrder}
				setOrder={setLinkOrder}
				maxOrder={linksDocuments.length + 1}
				icon={linkIcon}
				setIcon={setLinkIcon}
				title={linkTitle}
				setTitle={setLinkTitle}
				url={linkUrl}
				setUrl={setLinkUrl}
				formAction={storeIcon}
				disabled={false}
			>
				<button type='submit' disabled={formSubmit} className={buttonStylePrimary}>
					Ajouter
				</button>
			</LinkForm>
		</>
	);
}
