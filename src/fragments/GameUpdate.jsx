import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

import GameForm from '../components/GameForm.jsx';

import { buttonStylePrimary, buttonStyleSecondary, buttonStyleDanger } from '../components/ButtonStyle.jsx';

export default function GameUpdate({ id, url, title, description, category, categoryList, stateChanger }) {
	const [urlGame, setUrlGame] = useState(url);
	const [titleGame, setTitleGame] = useState(title);
	const [descriptionGame, setDescriptionGame] = useState(description);
	const [categoryGame, setCategoryGame] = useState(category);

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
		setUrlGame(url);
		setTitleGame(title);
		setDescriptionGame(description);
		handleCategory();
		setDisabledForm(!disabledForm);
	};

	return (
		<>
			<GameForm
				formAction={updateGame}
				disabled={disabledForm}
				id={id}
				url={urlGame}
				setUrl={setUrlGame}
				title={titleGame}
				setTitle={setTitleGame}
				description={descriptionGame}
				setDescription={setDescriptionGame}
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
