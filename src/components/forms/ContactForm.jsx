import React, { useState } from 'react';

import InputText from '../InputText.jsx';
import Textarea from '../Textarea.jsx';

export default function ContactForm({
	id,
	firstName,
	setFirstName,
	lastName,
	setLastName,
	email,
	setEmail,
	object,
	setObject,
	message,
	setMessage,
	formAction,
	disabled,
	children,
}) {
	const [firstNameError, setFirstNameError] = useState();
	const [lastNameError, setLastNameError] = useState();
	const [emailError, setEmailError] = useState();
	const [objectError, setObjectError] = useState();
	const [messageError, setMessageError] = useState();

	const handleFirstName = (event) => {
		setFirstName(event.target.value);
		setFirstNameError();
	};

	const handleLastName = (event) => {
		setLastName(event.target.value);
		setLastNameError();
	};

	const handleEmail = (event) => {
		setEmail(event.target.value);
		setEmailError();
	};

	const handleObject = (event) => {
		setObject(event.target.value);
		setObjectError();
	};

	const handleMessage = (event) => {
		setMessage(event.target.value);
		setMessageError();
	};

	const handleForm = (event) => {
		event.preventDefault();

		!firstName && setFirstNameError('Requis');
		!lastName && setLastNameError('Requis');
		!email && setEmailError('Requis');
		!object && setObjectError('Requis');
		!message && setMessageError('Requis');

		if (!firstName || !lastName || !email || !object || !message) return;

		formAction(event);
	};

	return (
		<form onSubmit={handleForm} className='flex flex-col h-full shadow rounded lg:p-6 p-4 border-8 border-zinc-800 bg-zinc-800/70'>
			<div className='flex flex-col w-full h-full lg:gap-4 gap-2'>
				<div className='flex lg:gap-6 gap-2'>
					<div className='w-full'>
						<InputText
							type={'text'}
							name={'firstName'}
							id={id}
							label={'Prénom'}
							value={firstName}
							errorMessage={firstNameError}
							disabled={disabled}
							onChange={handleFirstName}
							variant={'dark'}
						/>
					</div>

					<div className='w-full'>
						<InputText
							type={'text'}
							name={'lastName'}
							id={id}
							label={'Nom'}
							value={lastName}
							errorMessage={lastNameError}
							disabled={disabled}
							onChange={handleLastName}
							variant={'dark'}
						/>
					</div>
				</div>

				<div>
					<InputText
						type={'email'}
						name={'email'}
						id={id}
						label={'Email'}
						value={email}
						errorMessage={emailError}
						disabled={disabled}
						onChange={handleEmail}
						variant={'dark'}
					/>
				</div>

				<div>
					<InputText
						type={'text'}
						name={'object'}
						id={id}
						label={'Objet'}
						value={object}
						errorMessage={objectError}
						disabled={disabled}
						onChange={handleObject}
					/>
				</div>

				<div className='h-full'>
					<Textarea
						name={'message'}
						id={id}
						label={'Message'}
						value={message}
						errorMessage={messageError}
						disabled={disabled}
						onChange={handleMessage}
					/>
				</div>
				<div className='flex justify-center items-center pt-8 w-full'> {children}</div>
			</div>
		</form>
	);
}
