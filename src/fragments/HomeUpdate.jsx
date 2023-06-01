import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

import HomeForm from '../components/forms/HomeForm.jsx';

import { buttonStylePrimary, buttonStyleSecondary } from '../components/ButtonStyle.jsx';

export default function HomeUpdate({ id, title, description, stateChanger }) {
	const [homeTitle, setHomeTitle] = useState(title);
	const [homeDescription, setHomeDescription] = useState(description);

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
		setHomeTitle(title);
		setHomeDescription(description);
		setDisabledForm(!disabledForm);
	};

	return (
		<>
			<HomeForm id={id} title={homeTitle} setTitle={setHomeTitle} description={homeDescription} setDescription={setHomeDescription} formAction={updateHome} disabled={disabledForm}>
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
