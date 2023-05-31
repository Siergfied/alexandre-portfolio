import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

import VideoForm from '../components/VideoForm.jsx';

import { buttonStylePrimary } from '../components/ButtonStyle.jsx';

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

		videosDocuments.forEach(async (element) => {
			if (element.order >= formJson.order) {
				element.order++;
				await updateDoc(doc(db, 'videos', element.id), element);
			}
		});

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
