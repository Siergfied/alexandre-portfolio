import React, { useState } from 'react';

import InputText from '../InputText.jsx';
import Textarea from '../Textarea.jsx';

import { formStyle } from '../../layouts/Style.jsx';

export default function HomeForm({ id, title, setTitle, description, setDescription, formAction, disabled, children }) {
	const [titleError, setTitleError] = useState();
	const [descriptionError, setDescriptionError] = useState();

	const handleTitle = (event) => {
		setTitle(event.target.value);
		setTitleError();
	};

	const handleDescription = (event) => {
		setDescription(event.target.value);
		setDescriptionError();
	};

	const handleForm = (event) => {
		event.preventDefault();

		!title && setTitleError('Requis');
		!description && setDescriptionError('Requis');

		if (!title || !description) return;

		formAction(event);
	};

	return (
		<form onSubmit={handleForm} className={formStyle + 'flex-col'} id={id}>
			<div className='flex gap-6 h-full'>
				<div className='flex flex-col w-full h-full gap-2'>
					<div>
						<InputText
							type={'text'}
							name={'title'}
							id={id}
							label={'Titre'}
							value={title}
							errorMessage={titleError}
							disabled={disabled}
							onChange={handleTitle}
						/>
					</div>

					<div className='flex flex-col h-full'>
						<Textarea
							name={'description'}
							id={id}
							label={'Description'}
							value={description}
							errorMessage={descriptionError}
							disabled={disabled}
							onChange={handleDescription}
						/>
					</div>
				</div>
			</div>
			<div className='flex justify-end w-full gap-12'> {children}</div>
		</form>
	);
}
