import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

import InputText from '../components/InputText.jsx';
import { buttonStylePrimary, formStyle } from '../layouts/Style.jsx';

export default function Login() {
	const navigate = useNavigate();

	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const handleLogin = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		await signInWithEmailAndPassword(auth, formJson.email, formJson.password)
			.then(() => {
				navigate('presentation');
			})
			.catch((error) => {
				switch (error.code) {
					case 'auth/user-not-found':
						setEmailError('Utilisateur non trouvé !');
						break;
					case 'auth/wrong-password':
						setPasswordError('Mot de passe invalide !');
						break;
				}
			});
	};

	const handleEmail = (event) => {
		setLoginEmail(event.target.value);
		setEmailError('');
	};

	const handlePassword = (event) => {
		setLoginPassword(event.target.value);
		setPasswordError('');
	};

	useEffect(() => {
		document.title = 'Admin - AF';
	}, []);

	return (
		<div className='flex w-full h-full gap-6 overflow-hidden border-8 border-[#8759B4] rounded-sm bg-zinc-700 px-4 justify-center'>
			<form onSubmit={handleLogin} className={formStyle + 'flex-col w-96 h-fit mt-16'}>
				<div className='mt-4'>
					<InputText
						type={'email'}
						name={'email'}
						id={'email'}
						label={'Email'}
						value={loginEmail}
						errorMessage={emailError}
						disabled={false}
						onChange={handleEmail}
					/>
				</div>

				<div className='mt-4'>
					<InputText
						type={'password'}
						name={'password'}
						id={'password'}
						label={'Mot de passe'}
						value={loginPassword}
						errorMessage={passwordError}
						disabled={false}
						onChange={handlePassword}
					/>
				</div>

				<div className='mt-4 flex justify-end'>
					<button type='submit' className={buttonStylePrimary}>
						Connexion
					</button>
				</div>
			</form>
		</div>
	);
}
