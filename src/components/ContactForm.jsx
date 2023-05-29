import React from 'react';

export default function ContactForm({ handleForm }) {
	return (
		<form onSubmit={handleForm} className='flex flex-col'>
			<div className='flex flex-col w-full gap-2'>
				<div>
					<label htmlFor='nom' className='flex justify-between font-medium text-sm'>
						<span className=''>Nom Prénom</span>
						<span className=''>{''}</span>
					</label>
					<input type='text' name='url' autoComplete='off' className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full '} />
				</div>

				<div>
					<label htmlFor='nom' className='flex justify-between font-medium text-sm'>
						<span className=''>Adresse email</span>
						<span className=''>{''}</span>
					</label>
					<input type='text' name='url' autoComplete='off' className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full '} />
				</div>

				<div className='flex flex-col h-full'>
					<label htmlFor={'description'} className='flex justify-between font-medium text-sm'>
						<span className=''>Description</span>
						<span className=''>{''}</span>
					</label>
					<textarea name='description' id={'description'} className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-full resize-none '} />
				</div>
			</div>
		</form>
	);
}
