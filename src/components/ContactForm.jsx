import React, { useState } from 'react';

export default function ContactForm({ handleForm }) {
	const [nameError, setNameError] = useState();
	const [emailError, setEmailError] = useState();
	const [messageError, setMessageError] = useState();

	return (
		<form onSubmit={handleForm} className='flex flex-col border-2 border-red-600 shadow sm:rounded-lg sm:p-6'>
			<div className='flex flex-col w-full gap-2'>
				<div>
					<label htmlFor='nom' className='flex justify-between font-medium text-sm'>
						<span className=''>Nom Prénom</span>
						<span className=''>{nameError}</span>
					</label>
					<input type='text' id='name' name='name' autoComplete='off' className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full '} />
				</div>

				<div>
					<label htmlFor='email' className='flex justify-between font-medium text-sm'>
						<span className=''>Adresse email</span>
						<span className=''>{emailError}</span>
					</label>
					<input type='email' id='email' name='email' autoComplete='off' className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full '} />
				</div>

				<div className='flex flex-col h-full'>
					<label htmlFor='message' className='flex justify-between font-medium text-sm'>
						<span className=''>Message</span>
						<span className=''>{messageError}</span>
					</label>
					<textarea id='message' name='message' className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-full resize-none '} />
				</div>
			</div>
		</form>
	);
}
