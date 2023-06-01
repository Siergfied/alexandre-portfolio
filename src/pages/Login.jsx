import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { buttonStylePrimary } from '../components/ButtonStyle.jsx';

export default function Login() {
	const navigate = useNavigate();

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

	const handleEmail = () => {
		setEmailError('');
	};

	const handlePassword = () => {
		setPasswordError('');
	};

	useEffect(() => {
		document.title = 'Admin - AF';
	}, []);

	return (
		<div className='min-h-screen bg-zinc-800'>
			<div className='mx-auto max-w-xl space-y-6 sm:px-6 lg:px-6 py-12'>
				<div className='bg-violet-50 shadow sm:rounded-lg sm:p-6'>
					<form onSubmit={handleLogin} className=''>
						<div className='mt-4'>
							<label htmlFor='email' className='flex justify-between text-base'>
								<span className='text-zinc-700 font-semibold '>Email</span>
								<span className='text-red-600'>{emailError}</span>
							</label>

							<input
								type='email'
								name='email'
								htmlFor='email'
								autoComplete='false'
								className={
									'border-zinc-700 focus:border-[#8759B4] focus:ring-[#8759B4] rounded-md shadow-sm mt-1 block w-full bg-violet-50'
								}
								onChange={handleEmail}
							/>
						</div>

						<div className='mt-4'>
							<label htmlFor='email' className='flex justify-between text-base'>
								<span className='text-zinc-700 font-semibold '>Password</span>
								<span className='text-red-600'>{passwordError}</span>
							</label>

							<input
								type='password'
								name='password'
								htmlFor='password'
								autoComplete='off'
								className={
									'border-zinc-700 focus:border-[#8759B4] focus:ring-[#8759B4] rounded-md shadow-sm mt-1 block w-full bg-violet-50'
								}
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
			</div>
		</div>
	);
}
