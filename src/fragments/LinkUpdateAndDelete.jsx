import React, { useState } from 'react';
import { db, storage } from '../firebase.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';

import LinkForm from '../components/forms/LinkForm.jsx';

import storeImageFile from '../functions/storeImageFile.js';
import Order from '../functions/orderHandler.js';

import { buttonStylePrimary, buttonStyleSecondary, buttonStyleDanger } from '../layouts/Style.jsx';

export default function LinkUpdateAndDelete({ id, order, icon, title, url, stateChanger, name, folder, linksDocuments }) {
	const [disabledForm, setDisabledForm] = useState(true);

	const [linkOrder, setLinkOrder] = useState(order);
	const [linkIcon, setLinkIcon] = useState(icon);
	const [linkTitle, setLinkTitle] = useState(title);
	const [linkUrl, setLinkUrl] = useState(url);

	const handleDisabledForm = () => {
		setLinkOrder(order);
		setLinkIcon(icon);
		setLinkTitle(title);
		setLinkUrl(url);
		setDisabledForm(!disabledForm);
	};

	const updateIcon = async (event) => {
		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		let newLink = {
			id: id,
			title: formJson.title,
			url: formJson.url,
			order: Number(formJson.order),
		};

		if (formJson.icon.name) {
			await deleteObject(ref(storage, icon));
			let iconUrl = await storeImageFile(formJson.icon, folder, id);
			newLink.icon = iconUrl;
		}

		Order.onUpdate(linksDocuments, name, newLink.order, order);

		await updateDoc(doc(db, name, newLink.id), newLink);

		setDisabledForm(true);
		stateChanger();
	};

	const deleteIcon = async () => {
		await deleteObject(ref(storage, icon));
		await deleteDoc(doc(db, name, id));

		Order.onDelete(linksDocuments, name, order);

		stateChanger();
	};

	const [showDelete, setShowDelete] = useState(false);

	const handleDelete = () => {
		setShowDelete(!showDelete);
	};

	return (
		<>
			<LinkForm
				id={id}
				order={linkOrder}
				setOrder={setLinkOrder}
				maxOrder={linksDocuments.length}
				icon={linkIcon}
				setIcon={setLinkIcon}
				title={linkTitle}
				setTitle={setLinkTitle}
				url={linkUrl}
				setUrl={setLinkUrl}
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
			</LinkForm>
		</>
	);
}
