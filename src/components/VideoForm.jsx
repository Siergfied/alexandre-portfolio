import React, { useState } from 'react';

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

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		formJson.url ? '' : setUrlError('Requis');
		formJson.title ? '' : setTitleError('Requis');
		formJson.description ? '' : setDescriptionError('Requis');

		if (!formJson.url || !formJson.title || !formJson.description) return;

		formAction(event);
	};

	return (
		<form onSubmit={handleForm} className='flex flex-col bg-zinc-100 shadow sm:rounded-lg sm:p-6 text-zinc-800' id={id + order}>
			<div className='flex w-full gap-6'>
				<div>
					<label htmlFor={'order_' + id} className='flex font-semibold text-sm'>
						<span className='text-zinc-700'>Ordre</span>
					</label>

					<input
						type='number'
						name='order'
						id={'order_' + id}
						className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-16 ' + (disabled ? 'bg-zinc-400' : ' bg-zinc-100')}
						min={1}
						max={maxOrder}
						value={order}
						disabled={disabled}
						onChange={handleOrder}
					/>
				</div>

				<div className='flex flex-col w-1/2 gap-2'>
					<div>
						<label htmlFor={'url_' + id} className='flex justify-between font-medium text-sm'>
							<span className='text-zinc-700'>URL</span>
							<span className='text-red-600'>{urlError}</span>
						</label>
						<input
							type='text'
							name='url'
							id={'url_' + id}
							autoComplete='off'
							className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ' + (disabled ? 'bg-zinc-400' : 'bg-zinc-100')}
							value={url}
							disabled={disabled}
							onChange={handleUrl}
						/>
					</div>

					<div>
						<label htmlFor={'_title' + id} className='flex justify-between font-medium text-sm'>
							<span className='text-zinc-700'>Titre</span>
							<span className='text-red-600'>{titleError}</span>
						</label>
						<input
							type='text'
							name='title'
							id={'_title' + id}
							autoComplete='off'
							className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ' + (disabled ? 'bg-zinc-400' : 'bg-zinc-100')}
							value={title}
							disabled={disabled}
							onChange={handleTitle}
						/>
					</div>
				</div>

				<div className='flex flex-col w-full'>
					<label htmlFor={'description_' + id} className='flex justify-between font-medium text-sm'>
						<span className='text-zinc-700'>Description</span>
						<span className='text-red-600'>{descriptionError}</span>
					</label>
					<textarea
						name='description'
						id={'description_' + id}
						className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-full resize-none ' + (disabled ? 'bg-zinc-400' : 'bg-zinc-100')}
						value={description}
						disabled={disabled}
						onChange={handleDescription}
					/>
				</div>
			</div>

			<div className='flex justify-end w-full gap-12 mt-4'> {children}</div>
		</form>
	);
}
