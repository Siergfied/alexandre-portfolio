import React, { useCallback, useEffect } from 'react';
import { NavLink, useBeforeUnload, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

import GlobalLayout from './GlobalLayout.jsx';

export default function AdminLayout() {
	const navigate = useNavigate();

	const handleSignOut = async () => {
		signOut(auth)
			.then(() => {
				navigate('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
			} else {
				navigate('');
			}
		});
	}, []);

	useBeforeUnload(
		useCallback(() => {
			signOut(auth);
		})
	);

	const style = 'inline-flex items-center px-1 border-b-2 font-medium leading-5 uppercase focus:outline-none transition duration-300 ease-in-out ';

	const navlinkClass = ({ isActive }) =>
		isActive
			? style + 'border-[#8759B4] text-violet-50 focus:border-[#8759B4]'
			: style + 'border-transparent text-zinc-400 hover:text-violet-50 hover:border-violet-50 focus:text-violet-50 focus:border-violet-50';

	return (
		<GlobalLayout>
			<>
				<NavLink to='/admin/presentation' className={navlinkClass}>
					Présentation
				</NavLink>

				<NavLink to='/admin/realisations' className={navlinkClass}>
					Réalisations
				</NavLink>

				<NavLink to='/admin/videos' className={navlinkClass}>
					Videos
				</NavLink>

				<NavLink to='/admin/demo' className={navlinkClass}>
					Demo
				</NavLink>

				<button
					type='button'
					className={
						style + 'border-transparent text-zinc-400 hover:text-violet-50 hover:border-violet-50 focus:text-violet-50 focus:border-violet-50'
					}
					onClick={handleSignOut}
				>
					Déconnexion
				</button>
			</>
		</GlobalLayout>
	);
}
