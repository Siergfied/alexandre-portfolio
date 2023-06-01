import React, { useState } from 'react';
import { db, storage } from '../firebase.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';

import IconForm from '../components/forms/IconForm.jsx';

import storeImageFile from '../functions/storeImageFile.js';

import { buttonStylePrimary, buttonStyleSecondary, buttonStyleDanger } from '../components/ButtonStyle.jsx';

export default function IconUpdateAndDelete({ id, order, title, icon, stateChanger, name, folder, iconsDocuments }) {
	const [disabledForm, setDisabledForm] = useState(true);

	const [iconOrder, setIconOrder] = useState(order);
	const [iconImage, setIconImage] = useState(icon);
	const [iconTitle, setIconTitle] = useState(title);

	const handleDisabledForm = () => {
		setIconOrder(order);
		setIconTitle(title);
		setIconImage(icon);
		setDisabledForm(!disabledForm);
	};

	const updateIcon = async (event) => {
		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		let newIcon = {
			id: id,
			title: formJson.title,
			order: Number(formJson.order),
		};

		if (formJson.icon.name) {
			await deleteObject(ref(storage, icon));
			let iconUrl = await storeImageFile(formJson.icon, folder, id);
			newIcon.icon = iconUrl;
		}

		if (newIcon.order > order) {
			iconsDocuments.forEach(async (element) => {
				if (element.order > order && element.order <= newIcon.order) {
					element.order--;
					await updateDoc(doc(db, name, element.id), element);
				}
			});
		}

		if (newIcon.order < order) {
			iconsDocuments.forEach(async (element) => {
				if (element.order < order && element.order >= newIcon.order) {
					element.order++;
					await updateDoc(doc(db, name, element.id), element);
				}
			});
		}

		await updateDoc(doc(db, name, newIcon.id), newIcon);

		setDisabledForm(true);
		stateChanger();
	};

	const deleteIcon = async () => {
		await deleteObject(ref(storage, icon));
		await deleteDoc(doc(db, name, id));

		iconsDocuments.forEach(async (element) => {
			if (element.order > order) {
				element.order--;
				await updateDoc(doc(db, name, element.id), element);
			}
		});

		stateChanger();
	};

	const [showDelete, setShowDelete] = useState(false);

	const handleDelete = () => {
		setShowDelete(!showDelete);
	};

	return (
		<>
			<IconForm
				id={id}
				order={iconOrder}
				setOrder={setIconOrder}
				maxOrder={iconsDocuments.length}
				icon={iconImage}
				setIcon={setIconImage}
				title={iconTitle}
				setTitle={setIconTitle}
				formAction={updateIcon}
				disabled={disabledForm}
			>
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
