import React, { useState } from 'react';
import InputText from '../InputText.jsx';
import Textarea from '../Textarea.jsx';

import { formStyle } from '../../layouts/Style.jsx';

export default function GameForm({ id, url, setUrl, title, setTitle, description, setDescription, category, categoryList, formAction, disabled, children }) {
	const [urlError, setUrlError] = useState();
	const [titleError, setTitleError] = useState();
	const [descriptionError, setDescriptionError] = useState();

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
		<form onSubmit={handleForm} className={formStyle + 'flex-col'} id={id}>
			<div className='flex w-full gap-6'>
				<div className='flex flex-col w-full gap-2'>
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

					<div className='flex flex-col h-full'>
						<Textarea
							name={'description'}
							id={id}
							value={description}
							label={'Description'}
							errorMessage={descriptionError}
							disabled={disabled}
							onChange={handleDescription}
						/>
					</div>

					<div>
						<label className='flex justify-between font-medium text-sm'>
							<span className='font-semibold'>Categories</span>
						</label>
						<fieldset
							className={
								'border border-zinc-800 rounded shadow-sm py-2 px-3 flex flex-col gap-1 ' +
								(disabled ? 'bg-zinc-800' : 'bg-zinc-600')
							}
						>
							{categoryList &&
								categoryList.map(({ id, title }) => (
									<div key={id} className='flex items-center'>
										<input
											type='checkbox'
											id={'category_' + id}
											value={id}
											name='category'
											disabled={disabled}
											className='rounded border-zinc-400 shadow-sm focus:ring-[#8759B4] scale-110 text-zinc-700 '
										/>
										<label htmlFor={id + '_category'} className='ml-2 '>
											{title}
										</label>
									</div>
								))}
						</fieldset>
					</div>
				</div>
			</div>

			<div className='flex justify-end w-full gap-12'> {children}</div>
		</form>
	);
}
