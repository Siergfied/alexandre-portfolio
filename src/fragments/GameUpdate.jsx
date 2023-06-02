import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

import GameForm from '../components/forms/GameForm.jsx';

import { buttonStylePrimary, buttonStyleSecondary } from '../layouts/Style.jsx';

export default function GameUpdate({ id, url, title, description, category, categoryList, stateChanger }) {
	const [gameUrl, setGameUrl] = useState(url);
	const [gameTitle, setGameTitle] = useState(title);
	const [gameDescription, setGameDescription] = useState(description);
	//const [gameCategory, setGameCategory] = useState(category);

	const [disabledForm, setDisabledForm] = useState(true);

	const updateGame = async (event) => {
		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());
		formJson.category = formData.getAll('category');

		let newGames = {
			id: id,
			url: formJson.url,
			title: formJson.title,
			description: formJson.description,
			category: formJson.category,
		};

		await updateDoc(doc(db, 'games', id), newGames);

		setDisabledForm(true);
		stateChanger();
	};

	const handleCategory = () => {
		categoryList.forEach((element) => {
			document.querySelector('#category_' + element.id).checked = category.includes(element.id);
		});
	};

	useEffect(() => {
		handleCategory();
	}, []);

	const handleDisabledForm = () => {
		setGameUrl(url);
		setGameTitle(title);
		setGameDescription(description);
		handleCategory();
		setDisabledForm(!disabledForm);
	};

	return (
		<>
			<GameForm
				formAction={updateGame}
				disabled={disabledForm}
				id={id}
				url={gameUrl}
				setUrl={setGameUrl}
				title={gameTitle}
				setTitle={setGameTitle}
				description={gameDescription}
				setDescription={setGameDescription}
				category={category}
				categoryList={categoryList}
			>
				{disabledForm && (
					<>
						<button type='button' className={buttonStylePrimary} onClick={handleDisabledForm}>
							Modifier
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
			</GameForm>
		</>
	);
}
