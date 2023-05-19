import React, { useState } from 'react';

import { db } from '../firebase.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import VideoForm from './VideoForm.jsx';

export default function VideoUpdateAndDelete({ id, url, title, description, stateChanger }) {
	const [disabledForm, setDisabledForm] = useState(true);

	const updateVideo = async (event) => {
		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		let newVideo = {
			id: id,
			url: formJson.url,
			title: formJson.title,
			description: formJson.description,
		};

		await updateDoc(doc(db, 'videos', id), newVideo);

		setDisabledForm(true);
		stateChanger();
	};

	const deleteVideo = async () => {
		await deleteDoc(doc(db, 'videos', id));
		stateChanger();
	};

	const handleDisabledForm = () => {
		setDisabledForm(!disabledForm);
	};

	const [showDelete, setShowDelete] = useState(false);

	const handleDelete = () => {
		setShowDelete(!showDelete);
	};
	return (
		<>
			<VideoForm formAction={updateVideo} disabled={disabledForm} id={id} url={url} title={title} description={description}>
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
							onClick={deleteVideo}
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
			</VideoForm>
		</>
	);
}
