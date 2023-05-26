import React, { useEffect, useState } from 'react';

export default function GameForm({ id, url, setUrl, title, setTitle, description, setDescription, category, categoryList, formAction, disabled, children }) {
	const [urlError, setUrlError] = useState();
	const [titleError, setTitleError] = useState();
	const [descriptionError, setDescriptionError] = useState();

	const handleUrl = (event) => {
		setUrl && setUrl(event.target.value);
		setUrlError();
	};

	const handleTitle = (event) => {
		console.log('title', event.target.value);
		setTitle && setTitle(event.target.value);
		setTitleError();
	};

	const handleDescription = (event) => {
		setDescription && setDescription(event.target.value);
		setDescriptionError();
	};

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

	return (
		<>
			<div className='bg-zinc-100 shadow sm:rounded-lg sm:p-6'>
				<form onSubmit={handleForm} className='flex flex-col' id={id}>
					<div className='flex w-full gap-6'>
						<div className='flex flex-col w-full gap-2'>
							<div>
								<label htmlFor={id + '_url'} className='flex justify-between font-medium text-sm'>
									<span className='text-zinc-700'>URL</span>
									<span className='text-red-600'>{urlError}</span>
								</label>
								<input
									type='text'
									name='url'
									id={id + '_url'}
									autoComplete='off'
									className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ' + (disabled ? 'bg-zinc-400' : 'bg-zinc-100')}
									value={url}
									disabled={disabled}
									onChange={handleUrl}
								/>
							</div>

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
									value={title}
									disabled={disabled}
									onChange={handleTitle}
								/>
							</div>

							<div className='flex flex-col h-full'>
								<label htmlFor={id + '_description'} className='flex justify-between font-medium text-sm'>
									<span className='text-zinc-700'>Description</span>
									<span className='text-red-600'>{descriptionError}</span>
								</label>
								<textarea
									name='description'
									id={id + '_description'}
									className={
										'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-40 resize-none ' +
										(disabled ? 'bg-zinc-400' : 'bg-zinc-100')
									}
									value={description}
									disabled={disabled}
									onChange={handleDescription}
								/>
							</div>

							<div>
								<label className='flex justify-between font-medium text-sm'>
									<span className='text-zinc-700'>Categories</span>
									<span className='text-red-600'></span>
								</label>
								<fieldset className={'border border-zinc-400 rounded-md shadow-sm py-2 px-3 flex flex-col gap-1 ' + (disabled ? 'bg-zinc-400' : 'bg-zinc-100')}>
									{categoryList &&
										categoryList.map(({ id, title }) => (
											<div key={id} className='flex items-center'>
												<input
													type='checkbox'
													id={'category_' + id}
													value={id}
													name='category'
													disabled={disabled}
													className={'rounded border-zinc-400 shadow-sm focus:ring-indigo-500 scale-110 text-zinc-700 ' + (disabled ? 'bg-zinc-200' : '')}
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

					<div className='flex justify-end w-full gap-12 mt-4'> {children}</div>
				</form>
			</div>
		</>
	);
}
