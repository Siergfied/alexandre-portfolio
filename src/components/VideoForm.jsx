import React, { useState } from 'react';

export default function VideoForm({ id, url, title, description, formAction, disabled, children }) {
	const [urlError, setUrlError] = useState();
	const [titleError, setTitleError] = useState();
	const [descriptionError, setDescriptionError] = useState();

	const handleForm = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		formJson.url ? '' : setUrlError('Requis');
		formJson.title ? '' : setTitleError('Requis');
		formJson.description ? '' : setDescriptionError('Requis');

		if (!formJson.url || !formJson.title || !formJson.description) return;

		formAction(event);
	};

	const handleUrlError = () => {
		setUrlError();
	};

	const handleTitleError = () => {
		setTitleError();
	};

	const handleDescriptionError = () => {
		setDescriptionError();
	};

	return (
		<>
			<div className='bg-white shadow sm:rounded-lg sm:p-6'>
				<form onSubmit={handleForm} className='flex gap-6' id={id}>
					<div className='flex flex-col w-full gap-3'>
						<div>
							<label htmlFor={id + '_url'} className='flex justify-between font-medium text-sm'>
								<span className='text-gray-700'>URL</span>
								<span className='text-red-600'>{urlError}</span>
							</label>
							<input
								type='text'
								name='url'
								id={id + '_url'}
								autoComplete='off'
								className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ' + (disabled ? 'bg-zinc-200' : '')}
								defaultValue={url}
								disabled={disabled}
								onChange={handleUrlError}
							/>
						</div>

						<div>
							<label htmlFor={id + '_title'} className='flex justify-between font-medium text-sm'>
								<span className='text-gray-700'>Titre</span>
								<span className='text-red-600'>{titleError}</span>
							</label>
							<input
								type='text'
								name='title'
								id={id + '_title'}
								autoComplete='off'
								className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ' + (disabled ? 'bg-zinc-200' : '')}
								defaultValue={title}
								disabled={disabled}
								onChange={handleTitleError}
							/>
						</div>

						<div className='flex flex-col h-full'>
							<label htmlFor={id + '_description'} className='flex justify-between font-medium text-sm'>
								<span className='text-gray-700'>Description</span>
								<span className='text-red-600'>{descriptionError}</span>
							</label>
							<textarea
								name='description'
								id={id + '_description'}
								className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-full resize-none ' + (disabled ? 'bg-zinc-200' : '')}
								defaultValue={description}
								disabled={disabled}
								onChange={handleDescriptionError}
							/>
						</div>
					</div>

					<div className='flex flex-col justify-evenly w-32'> {children}</div>
				</form>
			</div>
		</>
	);
}
