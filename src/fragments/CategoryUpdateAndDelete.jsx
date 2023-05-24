import React, { useState } from 'react';
import { db, storage } from '../firebase.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';

import CategoryForm from '../components/CategoryForm.jsx';

import storeImageFile from '../functions/storeImageFile.js';

export default function CategoryUpdateAndDelete({ id, title, icon, stateChanger }) {
	const [iconImage, setIconImage] = useState(icon);

	const [disabledForm, setDisabledForm] = useState(true);

	const handleDisabledForm = () => {
		setDisabledForm(!disabledForm);
		setIconImage(icon);
	};

	const updateCategory = async (event) => {
		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		let newCategory = {
			id: id,
			title: formJson.title,
		};

		if (formJson.icon.name) {
			await deleteObject(ref(storage, icon));
			let iconUrl = await storeImageFile(formJson.icon, 'icons', id);
			newCategory.icon = iconUrl;
		}

		await updateDoc(doc(db, 'categories', newCategory.id), newCategory);

		setDisabledForm(true);
		stateChanger();
	};

	const deleteCategory = async () => {
		await deleteObject(ref(storage, icon));
		await deleteDoc(doc(db, 'categories', id));

		stateChanger();
	};

	const [showDelete, setShowDelete] = useState(false);

	const handleDelete = () => {
		setShowDelete(!showDelete);
	};

	const buttonStyle =
		'inline-flex items-center justify-center px-4 py-2 w-28 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ';

	const buttonStyleDefault = buttonStyle + 'bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 active:bg-zinc-900 focus:ring-indigo-500';

	const buttonStyleRed = buttonStyle + 'bg-red-600 hover:bg-red-500 active:bg-red-700 focus:ring-red-500';

	const buttonStyleGrey = buttonStyle + 'bg-zinc-400 hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500 focus:ring-zinc-500';

	return (
		<>
			<CategoryForm id={id} title={title} formAction={updateCategory} disabled={disabledForm} icon={iconImage} setIcon={setIconImage}>
				{disabledForm && !showDelete && (
					<>
						<button type='button' className={buttonStyleDefault} onClick={handleDisabledForm}>
							Modifier
						</button>

						<button type='button' className={buttonStyleRed} onClick={handleDelete}>
							Supprimer
						</button>
					</>
				)}

				{disabledForm && showDelete && (
					<>
						<button type='button' className={buttonStyleRed} onClick={deleteCategory}>
							Supprimer
						</button>

						<button type='button' className={buttonStyleGrey} onClick={handleDelete}>
							Annuler
						</button>
					</>
				)}

				{!disabledForm && (
					<>
						<button type='button' className={buttonStyleGrey} onClick={handleDisabledForm}>
							Annuler
						</button>

						<button type='submit' className={buttonStyleDefault}>
							Valider
						</button>
					</>
				)}
			</CategoryForm>
		</>
	);
}
