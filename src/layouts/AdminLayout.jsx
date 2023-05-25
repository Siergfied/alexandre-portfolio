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

	const style = 'inline-flex items-center px-1 pt-1 border-b-4 font-medium leading-5 uppercase focus:outline-none transition duration-150 ease-in-out ';

	const navlinkClass = ({ isActive }) =>
		isActive ? style + 'border-indigo-400 text-zinc-100 focus:border-indigo-700' : style + 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-gray-300 focus:text-zinc-300	 focus:border-gray-300';

	return (
		<GlobalLayout>
			<>
				<NavLink to='/admin/home_manage' className={navlinkClass}>
					Home Manage
				</NavLink>

				<NavLink to='/admin/image_manage' className={navlinkClass}>
					Image Manage
				</NavLink>

				<NavLink to='/admin/video_manage' className={navlinkClass}>
					Video Manage
				</NavLink>

				<NavLink to='/admin/game_manage' className={navlinkClass}>
					Game Manage
				</NavLink>

				<button type='button' className={style + 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-gray-300 focus:text-zinc-300	 focus:border-gray-300'} onClick={handleSignOut}>
					Sign out
				</button>
			</>
		</GlobalLayout>
	);
}
