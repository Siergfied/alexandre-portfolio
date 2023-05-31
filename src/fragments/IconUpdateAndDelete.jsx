import React, { useState } from 'react';
import { db, storage } from '../firebase.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';

import IconForm from '../components/IconForm.jsx';

import storeImageFile from '../functions/storeImageFile.js';

import { buttonStylePrimary, buttonStyleSecondary, buttonStyleDanger } from '../components/ButtonStyle.jsx';

export default function IconUpdateAndDelete({ id, title, icon, stateChanger, name, folder }) {
	const [titleCategory, setTitleCategory] = useState(title);
	const [iconCategory, setIconCategory] = useState(icon);

	const updateIcon = async (event) => {
		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		let newCategory = {
			id: id,
			title: formJson.title,
		};

		if (formJson.icon.name) {
			await deleteObject(ref(storage, icon));
			let iconUrl = await storeImageFile(formJson.icon, folder, id);
			newCategory.icon = iconUrl;
		}

		await updateDoc(doc(db, name, newCategory.id), newCategory);

		setDisabledForm(true);
		stateChanger();
	};

	const deleteIcon = async () => {
		await deleteObject(ref(storage, icon));
		await deleteDoc(doc(db, name, id));

		stateChanger();
	};

	const [disabledForm, setDisabledForm] = useState(true);

	const handleDisabledForm = () => {
		setTitleCategory(title);
		setIconCategory(icon);
		setDisabledForm(!disabledForm);
	};

	const [showDelete, setShowDelete] = useState(false);

	const handleDelete = () => {
		setShowDelete(!showDelete);
	};

	return (
		<>
			<IconForm id={id} title={titleCategory} setTitle={setTitleCategory} icon={iconCategory} setIcon={setIconCategory} formAction={updateIcon} disabled={disabledForm}>
				{disabledForm && !showDelete && (
					<>
						<button type='button' className={buttonStylePrimary} onClick={handleDisabledForm}>
							Modifier
						</button>

						<button type='button' className={buttonStyleDanger} onClick={handleDelete}>
							Supprimer
						</button>
					</>
				)}

				{disabledForm && showDelete && (
					<>
						<button type='button' className={buttonStyleDanger} onClick={deleteIcon}>
							Supprimer
						</button>

						<button type='button' className={buttonStyleSecondary} onClick={handleDelete}>
							Annuler
						</button>
					</>
				)}

				{!disabledForm && (
					<>
						<button type='button' className={buttonStyleSecondary} onClick={handleDisabledForm}>
							Annuler
						</button>

						<button type='submit' className={buttonStylePrimary}>
							Valider
						</button>
					</>
				)}
			</IconForm>
		</>
	);
}
