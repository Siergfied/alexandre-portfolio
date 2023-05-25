import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import VideoForm from '../components/VideoForm.jsx';

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

	const buttonStyle =
		'inline-flex items-center justify-center px-4 py-2 w-28 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ';

	const buttonStyleDefault = buttonStyle + 'bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 active:bg-zinc-900 focus:ring-indigo-500';

	const buttonStyleRed = buttonStyle + 'bg-red-600 hover:bg-red-500 active:bg-red-700 focus:ring-red-500';

	const buttonStyleGrey = buttonStyle + 'bg-zinc-400 hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500 focus:ring-zinc-500';

	return (
		<>
			<VideoForm formAction={updateVideo} disabled={disabledForm} id={id} url={url} title={title} description={description}>
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
						<button type='button' className={buttonStyleRed} onClick={deleteVideo}>
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
			</VideoForm>
		</>
	);
}
