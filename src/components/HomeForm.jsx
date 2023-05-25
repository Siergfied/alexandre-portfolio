import React, { useState } from 'react';

export default function HomeForm({ id, title, description, formAction, disabled, children }) {
	const [titleError, setTitleError] = useState();
	const [descriptionError, setDescriptionError] = useState();

	const handleForm = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		formJson.title ? '' : setTitleError('Requis');
		formJson.description ? '' : setDescriptionError('Requis');

		if (!formJson.title || !formJson.description) return;

		formAction(event);
	};

	const handleTitleError = () => {
		setTitleError();
	};

	const handleDescriptionError = () => {
		setDescriptionError();
	};

	return (
		<>
			<div className='bg-zinc-100 shadow sm:rounded-lg sm:p-6'>
				<form onSubmit={handleForm} className='flex flex-col' id={id}>
					<div className='flex w-full gap-6'>
						<div className='flex flex-col w-full gap-2'>
							<div>
								<label htmlFor={id + '_title'} className='flex justify-between font-medium text-sm'>
									<span className='text-zinc-700'>Titre</span>
									<span className='text-red-600'>{titleError}</span>
								</label>
								<input
									type='text'
									name='title'
									id={id + '_title'}
									autoComplete='off'
									className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ' + (disabled ? 'bg-zinc-400' : 'bg-zinc-100')}
									defaultValue={title}
									disabled={disabled}
									onChange={handleTitleError}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor={id + '_description'} className='flex justify-between font-medium text-sm'>
									<span className='text-zinc-700'>Description</span>
									<span className='text-red-600'>{descriptionError}</span>
								</label>
								<textarea
									name='description'
									id={id + '_description'}
									className={
										'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-full resize-none ' +
										(disabled ? 'bg-zinc-400' : 'bg-zinc-100')
									}
									defaultValue={description}
									disabled={disabled}
									onChange={handleDescriptionError}
								/>
							</div>
						</div>
					</div>
					<div className='flex justify-end w-full gap-12 mt-4'> {children}</div>
				</form>
			</div>
		</>
	);
}
