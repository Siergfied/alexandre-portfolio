import React from 'react';

export default function VideoForm({ id, url, title, description, formHandler, disabled, children }) {
	return (
		<>
			<div className='bg-white shadow sm:rounded-lg sm:p-6'>
				<form onSubmit={formHandler} className='flex gap-6' id={id}>
					<div className='flex flex-col grow'>
						<div>
							<label htmlFor={id + '_url'} className='block font-medium text-sm text-gray-700'>
								URL
							</label>
							<input
								type='text'
								name='url'
								id={id + '_url'}
								autoComplete='off'
								className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ' + (disabled ? 'bg-zinc-200' : '')}
								defaultValue={url}
								disabled={disabled}
							/>
						</div>

						<div>
							<label htmlFor={id + '_title'} className='block font-medium text-sm text-gray-700'>
								Titre
							</label>
							<input
								type='text'
								name='title'
								id={id + '_title'}
								autoComplete='off'
								className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ' + (disabled ? 'bg-zinc-200' : '')}
								defaultValue={title}
								disabled={disabled}
							/>
						</div>

						<div className='mt-1 flex flex-col h-full'>
							<label htmlFor={id + '_description'} className='block font-medium text-sm text-gray-700'>
								Description
							</label>
							<textarea
								name='description'
								id={id + '_description'}
								className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-full resize-none ' + (disabled ? 'bg-zinc-200' : '')}
								defaultValue={description}
								disabled={disabled}
							/>
						</div>
					</div>

					<div className='flex flex-col justify-evenly w-32'> {children}</div>
				</form>
			</div>
		</>
	);
}
