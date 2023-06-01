import React, { useState } from 'react';

import InputText from '../InputText';
import Textarea from '../Textarea';
import InputNumber from '../InputNumber';

import { formStyle } from '../../layouts/Style.jsx';

export default function VideoForm({ id, order, setOrder, maxOrder, url, setUrl, title, setTitle, description, setDescription, formAction, disabled, children }) {
	const [urlError, setUrlError] = useState();
	const [titleError, setTitleError] = useState();
	const [descriptionError, setDescriptionError] = useState();

	const handleOrder = (event) => {
		if (event.target.value == '' || event.target.value > maxOrder || event.target.value < 1) {
			event.target.value = order;
		}
		setOrder(event.target.value);
	};

	const handleUrl = (event) => {
		setUrl(event.target.value);
		setUrlError();
	};

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

		!url && setUrlError('Requis');
		!title && setTitleError('Requis');
		!description && setDescriptionError('Requis');

		if (!url || !title || !description) return;

		formAction(event);
	};

	return (
		<form onSubmit={handleForm} className={formStyle + 'flex-col'} id={id + order}>
			<div className='flex w-full gap-6'>
				<div>
					<InputNumber name={'order'} id={id} label={'Ordre'} value={order} min={1} max={maxOrder} disabled={disabled} onChange={handleOrder} />
				</div>

				<div className='flex flex-col w-1/2 gap-2'>
					<div>
						<InputText
							type={'url'}
							name={'url'}
							id={id}
							label={'URL'}
							value={url}
							errorMessage={urlError}
							disabled={disabled}
							onChange={handleUrl}
						/>
					</div>

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
				</div>

				<div className='flex flex-col w-full'>
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

			<div className='flex justify-end w-full gap-12'> {children}</div>
		</form>
	);
}
