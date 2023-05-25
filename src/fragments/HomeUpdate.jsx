import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

import HomeForm from '../components/HomeForm.jsx';

export default function HomeUpdate({ id, title, description, stateChanger }) {
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
		setDisabledForm(!disabledForm);
	};

	const buttonStyle =
		'inline-flex items-center justify-center px-4 py-2 w-28 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-250 ';

	const buttonStyleDefault = buttonStyle + 'bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 active:bg-zinc-900 focus:ring-indigo-500';

	const buttonStyleGrey = buttonStyle + 'bg-zinc-400 hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500 focus:ring-zinc-500';

	return (
		<>
			<HomeForm formAction={updateHome} disabled={disabledForm} id={id} title={title} description={description}>
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
			</HomeForm>
		</>
	);
}
