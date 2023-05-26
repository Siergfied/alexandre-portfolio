import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

import GameForm from '../components/GameForm.jsx';

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

	const buttonStyle =
		'inline-flex items-center justify-center px-4 py-2 w-28 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ';

	const buttonStyleDefault = buttonStyle + 'bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 active:bg-zinc-900 focus:ring-indigo-500';

	const buttonStyleGrey = buttonStyle + 'bg-zinc-400 hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500 focus:ring-zinc-500';

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
						<button type='button' className={buttonStyleDefault} onClick={handleDisabledForm}>
							Modifier
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
			</GameForm>
		</>
	);
}
