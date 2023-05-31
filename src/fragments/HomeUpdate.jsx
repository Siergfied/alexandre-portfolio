import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

import HomeForm from '../components/HomeForm.jsx';

import { buttonStylePrimary, buttonStyleSecondary } from '../components/ButtonStyle.jsx';

export default function HomeUpdate({ id, title, description, stateChanger }) {
	const [titleHome, setTitleHome] = useState(title);
	const [descriptionHome, setDescriptionHome] = useState(description);

	const [disabledForm, setDisabledForm] = useState(true);

	const updateHome = async (event) => {
		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		let newHome = {
			id: id,
			title: formJson.title,
			description: formJson.description,
		};

		await updateDoc(doc(db, 'homes', id), newHome);

		setDisabledForm(true);
		stateChanger();
	};

	const handleDisabledForm = () => {
		setTitleHome(title);
		setDescriptionHome(description);
		setDisabledForm(!disabledForm);
	};

	return (
		<>
			<HomeForm formAction={updateHome} disabled={disabledForm} id={id} title={titleHome} setTitle={setTitleHome} description={descriptionHome} setDescription={setDescriptionHome}>
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
			</HomeForm>
		</>
	);
}
