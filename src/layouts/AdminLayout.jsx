import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { auth } from '../firebase.js';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import GlobalLayout from './GlobalLayout.jsx';

//TODO add signout on tab close event

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

	const style = 'inline-flex items-center px-1 pt-1 border-b-2 font-medium uppercase leading-5 focus:outline-none transition duration-150 ease-in-out ';

	const navlinkClass = ({ isActive }) =>
		isActive ? style + 'border-indigo-400 text-gray-900 focus:border-indigo-700' : style + 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300';

	return (
		<GlobalLayout>
			<nav className='flex justify-between h-16'>
				<NavLink to='/admin/test' className={navlinkClass}>
					Test
				</NavLink>

				<NavLink to='/admin/home_manage' className={navlinkClass}>
					Home Manage
				</NavLink>

				<NavLink to='/admin/image_manage' className={navlinkClass}>
					Image Manage
				</NavLink>

				<NavLink to='/admin/video_manage' className={navlinkClass}>
					Video Manage
				</NavLink>

				<button
					type='button'
					className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
					onClick={handleSignOut}
				>
					Sign out
				</button>
			</nav>
		</GlobalLayout>
	);
}
