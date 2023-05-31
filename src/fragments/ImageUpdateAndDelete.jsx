import React, { useState } from 'react';
import { db, storage } from '../firebase.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';

import ImageForm from '../components/ImageForm.jsx';

import storeImageFile from '../functions/storeImageFile.js';

import { buttonStylePrimary, buttonStyleSecondary, buttonStyleDanger } from '../components/ButtonStyle.jsx';

export default function ImageUpdateAndDelete({ id, order, cover, background, title, description, stateChanger, imagesDocuments }) {
	const [disabledForm, setDisabledForm] = useState(true);

	const [imageOrder, setImageOrder] = useState(order);
	const [imageTitle, setImageTitle] = useState(title);
	const [imageDescription, setImageDescription] = useState(description);
	const [imageCover, setImageCover] = useState(cover);
	const [imageBackground, setImageBackground] = useState(background);

	const handleDisabledForm = () => {
		setImageOrder(order);
		setImageTitle(title);
		setImageDescription(description);
		setImageCover(cover);
		setImageBackground(background);
		setDisabledForm(!disabledForm);
	};

	const updateImage = async (event) => {
		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		let newImage = {
			id: id,
			title: formJson.title,
			description: formJson.description,
			order: Number(formJson.order),
		};

		if (imageCover.file) {
			await deleteObject(ref(storage, cover));
			let coverUrl = await storeImageFile(imageCover.file, 'images', id + '_cover');
			newImage.cover = coverUrl;
		}

		if (imageBackground.file) {
			await deleteObject(ref(storage, background));
			let backgroundUrl = await storeImageFile(imageBackground.file, 'images', id + '_background');
			newImage.background = backgroundUrl;
		}

		if (newImage.order > order) {
			imagesDocuments.forEach(async (element) => {
				if (element.order <= newImage.order && element.order != order) {
					element.order--;
					await updateDoc(doc(db, 'images', element.id), element);
				}
			});
		}

		if (newImage.order < order) {
			imagesDocuments.forEach(async (element) => {
				if (element.order <= order) {
					element.order++;
					await updateDoc(doc(db, 'images', element.id), element);
				}
			});
		}

		await updateDoc(doc(db, 'images', newImage.id), newImage);

		setDisabledForm(true);
		stateChanger();
	};

	const deleteImage = async () => {
		await deleteObject(ref(storage, cover));
		await deleteObject(ref(storage, background));
		await deleteDoc(doc(db, 'images', id));

		imagesDocuments.forEach(async (element) => {
			if (element.order > order) {
				element.order--;
				await updateDoc(doc(db, 'images', element.id), element);
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
			<ImageForm
				id={id}
				order={imageOrder}
				setOrder={setImageOrder}
				maxOrder={imagesDocuments.length}
				title={imageTitle}
				setTitle={setImageTitle}
				description={imageDescription}
				setDescription={setImageDescription}
				coverImageCropped={imageCover}
				setCoverImageCropped={setImageCover}
				backgroundImageCropped={imageBackground}
				setBackgroundImageCropped={setImageBackground}
				formAction={updateImage}
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
						<button type='button' className={buttonStyleDanger} onClick={deleteImage}>
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
			</ImageForm>
		</>
	);
}
