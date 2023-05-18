import React, { useState } from 'react';

import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';

import VideoForm from './VideoForm.jsx';

export default function VideoAdd({ stateChanger }) {
	const [formSubmit, setFormSubmit] = useState(false);

	const clearForm = () => {
		document.querySelectorAll('input').forEach((input) => (input.value = ''));
		document.querySelectorAll('textarea').forEach((input) => (input.value = ''));
	};

	const storeVideo = async (event) => {
		event.preventDefault();

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
			<VideoForm id={'upload'} formHandler={storeVideo} disabled={false}>
				<button
					type='submit'
					disabled={formSubmit}
					className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
				>
					Ajouter
				</button>
			</VideoForm>
		</>
	);
}
