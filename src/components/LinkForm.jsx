import React, { useState } from 'react';

export default function LinkForm({ id, icon, setIcon, title, setTitle, url, setUrl, formAction, disabled, children }) {
	const [iconError, setIconError] = useState();
	const [titleError, setTitleError] = useState();
	const [urlError, setUrlError] = useState();

	const handleTitle = (event) => {
		setTitle && setTitle(event.target.value);
		setTitleError();
	};

	const handleUrl = (event) => {
		setUrl && setUrl(event.target.value);
		setUrl();
	};

	const handleIcon = async (event) => {
		setIconError();
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = function () {
				setIcon(reader.result);
			};
		}
	};

	const handleForm = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		formJson.url ? '' : setUrlError('Requis');
		formJson.title ? '' : setTitleError('Requis');
		icon ? '' : setIconError('Requis');

		if (!formJson.url || !formJson.title || !icon) return;

		formAction(event);
	};

	return (
		<>
			<div className='bg-zinc-100 shadow sm:rounded-lg sm:p-6'>
				<form onSubmit={handleForm} className='flex flex-row gap-6'>
					<div>
						<label className='flex justify-between font-medium text-sm'>
							<span className='text-zinc-700'>Icône</span>
							<span className='text-red-600'>{iconError}</span>
						</label>
						<div className={'relative flex items-center justify-center rounded-md mt-1 border border-zinc-400 ' + (disabled ? 'bg-zinc-400' : 'bg-zinc-100')}>
							<div className='z-0 h-20 w-20 m-2 bg-zinc-800'>{icon && <img src={icon} className='w-full h-full' />}</div>
							{!disabled && (
								<label
									htmlFor={'icon_' + id}
									className='z-10 absolute inline-flex items-center justify-center px-2 py-2 bg-zinc-600 border border-transparent rounded-md font-semibold text-[0.5rem] text-white uppercase tracking-widest hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 cursor-pointer w-16'
								>
									{icon && 'Modifier'}
									{!icon && 'Parcourir'}
								</label>
							)}

							<input type='file' accept='.svg' name='icon' id={'icon_' + id} onChange={handleIcon} disabled={disabled} className='hidden' />
						</div>
					</div>

					<div className='flex flex-col w-full h-full gap-2'>
						<div className='flex flex-col w-full'>
							<label htmlFor={'title_' + id} className='flex justify-between font-medium text-sm '>
								<span className='text-zinc-700'>Titre</span>
								<span className='text-red-600'>{titleError}</span>
							</label>

							<input
								type='text'
								name='title'
								id={'title_' + id}
								autoComplete='off'
								className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ' + (disabled ? 'bg-zinc-400' : 'bg-zinc-100')}
								value={title}
								disabled={disabled}
								onChange={handleTitle}
							/>
						</div>

						<div className='flex flex-col w-full'>
							<label htmlFor={'url_' + id} className='flex justify-between font-medium text-sm '>
								<span className='text-zinc-700'>URL</span>
								<span className='text-red-600'>{urlError}</span>
							</label>

							<input
								type='url'
								name='url'
								id={'url' + id}
								autoComplete='off'
								className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ' + (disabled ? 'bg-zinc-400' : 'bg-zinc-100')}
								value={url}
								disabled={disabled}
								onChange={handleUrl}
							/>
						</div>
						<div className='flex justify-end w-full gap-12 mt-auto mb-0'> {children}</div>
					</div>
				</form>
			</div>
		</>
	);
}
