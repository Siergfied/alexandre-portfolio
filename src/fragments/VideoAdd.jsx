import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';

import VideoForm from '../components/forms/VideoForm.jsx';

import Order from '../functions/orderHandler.js';

import { buttonStylePrimary } from '../layouts/Style.jsx';

export default function VideoAdd({ stateChanger, videosDocuments }) {
	const [formSubmit, setFormSubmit] = useState(false);

	const [videoOrder, setVideoOrder] = useState(1);
	const [videoUrl, setVideoUrl] = useState('');
	const [videoTitle, setVideoTitle] = useState('');
	const [videoDescription, setVideoDescription] = useState('');

	const clearForm = () => {
		setVideoOrder(1);
		setVideoUrl('');
		setVideoTitle('');
		setVideoDescription('');
	};

	const storeVideo = async (event) => {
		if (formSubmit) return;
		setFormSubmit(true);

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		formJson.id = Date.now().toString();
		formJson.order = Number(formJson.order);

		Order.onNew(videosDocuments, 'videos', formJson.order);

		await setDoc(doc(db, 'videos', formJson.id), formJson);

		clearForm();
		stateChanger();
		setFormSubmit(false);
	};

	return (
		<>
			<VideoForm
				id={'upload'}
				order={videoOrder}
				setOrder={setVideoOrder}
				maxOrder={videosDocuments.length + 1}
				url={videoUrl}
				setUrl={setVideoUrl}
				title={videoTitle}
				setTitle={setVideoTitle}
				description={videoDescription}
				setDescription={setVideoDescription}
				formAction={storeVideo}
				disabled={false}
			>
				<button type='submit' disabled={formSubmit} className={buttonStylePrimary}>
					Ajouter
				</button>
			</VideoForm>
		</>
	);
}
