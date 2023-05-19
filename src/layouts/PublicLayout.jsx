import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function MainLayout() {
	const navlinkClass = ({ isActive }) =>
		isActive
			? 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
			: 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out';

	return (
		<div className='min-h-screen bg-gray-100'>
			<div className='sticky top-0 z-50 border-b border-gray-400 bg-white h-16'>
				<div className='mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-6'>
					<nav className='flex justify-between h-16'>
						<NavLink to='/' className={navlinkClass}>
							Home Display
						</NavLink>

						<NavLink to='/image' className={navlinkClass}>
							Image Display
						</NavLink>

						<NavLink to='/video' className={navlinkClass}>
							Video Display
						</NavLink>

						<NavLink to='/admin' className={navlinkClass}>
							Admin
						</NavLink>
					</nav>
				</div>
			</div>

			<div className='overflow-y-scroll'>
				<div className='mx-auto max-w-7xl sm:px-6 lg:px-6 py-12 h-[calc(100vh-4rem)]'>
					<Outlet />
					<div className='pt-12'></div>
				</div>
			</div>
		</div>
	);
}
