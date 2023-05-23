import React, { useState } from 'react';

export default function CategoryForm({ id, title, icon, disabled, children }) {
	const handleForm = (event) => {
		event.preventDefault();
	};

	const [titleError, setTitleError] = useState();

	const handleTitleError = () => {
		setTitleError();
	};

	return (
		<>
			<div className='bg-white shadow sm:rounded-lg sm:p-6'>
				<form onSubmit={handleForm} className='flex flex-col'>
					<div>
						<label htmlFor={id + '_title'} className='flex justify-between font-medium text-sm '>
							<span className='text-gray-700'>Title</span>
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
				</form>
			</div>
		</>
	);
}
