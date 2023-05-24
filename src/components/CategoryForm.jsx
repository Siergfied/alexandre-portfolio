import React, { useState } from 'react';

export default function CategoryForm({ id, title, icon, setIcon, formAction, disabled, children }) {
	const [titleError, setTitleError] = useState();
	const [iconError, setIconError] = useState();

	const handleTitle = () => {
		setTitleError();
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

		formJson.title ? '' : setTitleError('Requis');
		icon ? '' : setIconError('Requis');

		if (!formJson.title || !icon) return;

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
							<div className='z-0 h-32 w-32 m-2 bg-zinc-800'>{icon && <img src={icon} className='w-full h-full' />}</div>
							{!disabled && (
								<label
									htmlFor={id + '_icon'}
									className='z-10 absolute inline-flex items-center justify-center px-4 py-2 bg-zinc-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 cursor-pointer w-28'
								>
									{icon && 'Modifier'}
									{!icon && 'Sélectionner'}
								</label>
							)}

							<input type='file' name='icon' id={id + '_icon'} onChange={handleIcon} disabled={disabled} className='hidden' />
						</div>
					</div>

					<div className='flex flex-col w-full'>
						<div>
							<label htmlFor={id + '_title'} className='flex justify-between font-medium text-sm '>
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
								onChange={handleTitle}
							/>
						</div>

						<div className='flex justify-end w-full gap-12 mt-auto'> {children}</div>
					</div>
				</form>
			</div>
		</>
	);
}
