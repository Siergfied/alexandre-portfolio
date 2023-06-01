import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import VideoForm from '../components/forms/VideoForm.jsx';

import { buttonStylePrimary, buttonStyleSecondary, buttonStyleDanger } from '../components/ButtonStyle.jsx';

export default function VideoUpdateAndDelete({ id, order, url, title, description, stateChanger, videosDocuments }) {
	const [disabledForm, setDisabledForm] = useState(true);

	const [videoOrder, setVideoOrder] = useState(order);
	const [videoUrl, setVideoUrl] = useState(url);
	const [videoTitle, setVideoTitle] = useState(title);
	const [videoDescription, setVideoDescription] = useState(description);

	const handleDisabledForm = () => {
		setVideoOrder(order);
		setVideoUrl(url);
		setVideoTitle(title);
		setVideoDescription(description);
		setDisabledForm(!disabledForm);
	};

	const updateVideo = async (event) => {
		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		let newVideo = {
			id: id,
			url: formJson.url,
			title: formJson.title,
			description: formJson.description,
			order: Number(formJson.order),
		};

		if (newVideo.order > order) {
			videosDocuments.forEach(async (element) => {
				if (element.order > order && element.order <= newVideo.order) {
					element.order--;
					await updateDoc(doc(db, 'videos', element.id), element);
				}
			});
		}

		if (newVideo.order < order) {
			videosDocuments.forEach(async (element) => {
				if (element.order < order && element.order >= newVideo.order) {
					element.order++;
					await updateDoc(doc(db, 'videos', element.id), element);
				}
			});
		}

		await updateDoc(doc(db, 'videos', id), newVideo);

		setDisabledForm(true);
		stateChanger();
	};

	const deleteVideo = async () => {
		await deleteDoc(doc(db, 'videos', id));

		videosDocuments.forEach(async (element) => {
			if (element.order > order) {
				element.order--;
				await updateDoc(doc(db, 'videos', element.id), element);
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
			<VideoForm
				id={id}
				order={videoOrder}
				setOrder={setVideoOrder}
				maxOrder={videosDocuments.length}
				url={videoUrl}
				setUrl={setVideoUrl}
				title={videoTitle}
				setTitle={setVideoTitle}
				description={videoDescription}
				setDescription={setVideoDescription}
				formAction={updateVideo}
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
						<button type='button' className={buttonStyleDanger} onClick={deleteVideo}>
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
			</VideoForm>
		</>
	);
}
