import React, { useState } from 'react';
import { db, storage } from '../firebase.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';

import ImageForm from '../components/ImageForm.jsx';

import storeImageFile from '../functions/storeImageFile.js';

export default function ImageUpdateAndDelete({ id, cover, background, title, description, stateChanger }) {
	const [coverImage, setCoverImage] = useState(cover);
	const [backgroundImage, setBackgroundImage] = useState(background);

	const [disabledForm, setDisabledForm] = useState(true);

	const handleDisabledForm = () => {
		setDisabledForm(!disabledForm);
		setCoverImage(cover);
		setBackgroundImage(background);
	};

	const updateImage = async (event) => {
		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		let newImage = {
			id: id,
			title: formJson.title,
			description: formJson.description,
		};

		if (coverImage.file) {
			await deleteObject(ref(storage, cover));
			let coverUrl = await storeImageFile(coverImage.file, 'images', id + '_cover');
			newImage.cover = coverUrl;
		}

		if (backgroundImage.file) {
			await deleteObject(ref(storage, background));
			let backgroundUrl = await storeImageFile(backgroundImage.file, 'images', id + '_background');
			newImage.background = backgroundUrl;
		}

		await updateDoc(doc(db, 'images', newImage.id), newImage);

		setDisabledForm(true);
		stateChanger();
	};

	const deleteImage = async () => {
		await deleteObject(ref(storage, cover));
		await deleteObject(ref(storage, background));
		await deleteDoc(doc(db, 'images', id));

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
			<ImageForm
				id={id}
				title={title}
				description={description}
				formAction={updateImage}
				disabled={disabledForm}
				coverImageCropped={coverImage}
				setCoverImageCropped={setCoverImage}
				backgroundImageCropped={backgroundImage}
				setBackgroundImageCropped={setBackgroundImage}
			>
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
						<button type='button' className={buttonStyleRed} onClick={deleteImage}>
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
			</ImageForm>
		</>
	);
}
