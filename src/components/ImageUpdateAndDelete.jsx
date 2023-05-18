import React, { useState } from 'react';

import { db, storage } from '../firebase.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';

import ImageForm from './ImageForm.jsx';

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
		event.preventDefault();

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		let newImage = {
			id: id,
			title: formJson.title,
			description: formJson.description,
		};

		if (coverImage.file) {
			await deleteObject(ref(storage, cover));
			let coverUrl = await storeImageFile(coverImage.file, id + '_cover');
			newImage.cover = coverUrl;
		}

		if (backgroundImage.file) {
			await deleteObject(ref(storage, background));
			let backgroundUrl = await storeImageFile(backgroundImage.file, id + '_background');
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

	return (
		<>
			<ImageForm
				id={id}
				title={title}
				description={description}
				formHandler={updateImage}
				disabled={disabledForm}
				coverImageCropped={coverImage}
				setCoverImageCropped={setCoverImage}
				backgroundImageCropped={backgroundImage}
				setBackgroundImageCropped={setBackgroundImage}
			>
				{disabledForm && !showDelete && (
					<>
						<button
							type='button'
							className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
							onClick={handleDisabledForm}
						>
							Modifier
						</button>

						<button
							type='button'
							className='inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150'
							onClick={handleDelete}
						>
							Supprimer
						</button>
					</>
				)}

				{disabledForm && showDelete && (
					<>
						<button
							type='button'
							className='inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150'
							onClick={deleteImage}
						>
							Supprimer
						</button>

						<button
							type='button'
							className='inline-flex items-center justify-center px-4 py-2 bg-zinc-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
							onClick={handleDelete}
						>
							Annuler
						</button>
					</>
				)}

				{!disabledForm && (
					<>
						<button
							type='button'
							className='inline-flex items-center justify-center px-4 py-2 bg-zinc-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
							onClick={handleDisabledForm}
						>
							Annuler
						</button>

						<button
							type='submit'
							className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
						>
							Valider
						</button>
					</>
				)}
			</ImageForm>
		</>
	);
}
