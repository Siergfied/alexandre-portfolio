import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';

import VideoForm from '../components/VideoForm.jsx';

export default function VideoAdd({ stateChanger }) {
	const [formSubmit, setFormSubmit] = useState(false);

	const clearForm = () => {
		document.querySelector('#upload_url').value = '';
		document.querySelector('#upload_title').value = '';
		document.querySelector('#upload_description').value = '';
	};

	const storeVideo = async (event) => {
		if (formSubmit) return;
		setFormSubmit(true);

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		formJson.id = Date.now().toString();

		await setDoc(doc(db, 'videos', formJson.id), formJson);

		clearForm();
		stateChanger();
		setFormSubmit(false);
	};

	return (
		<>
			<VideoForm id={'upload'} formAction={storeVideo} disabled={false}>
				<button
					type='submit'
					disabled={formSubmit}
					className='inline-flex items-center justify-center px-4 py-2 w-28 bg-zinc-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-700 focus:bg-zinc-700 active:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
				>
					Ajouter
				</button>
			</VideoForm>
		</>
	);
}
