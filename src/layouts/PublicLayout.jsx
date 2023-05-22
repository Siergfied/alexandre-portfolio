import React from 'react';
import { NavLink } from 'react-router-dom';

import GlobalLayout from './GlobalLayout';

export default function MainLayout() {
	const style = 'inline-flex items-center px-1 pt-1 border-b-4 font-medium leading-5 uppercase focus:outline-none transition duration-150 ease-in-out ';

	const navlinkClass = ({ isActive }) =>
		isActive ? style + 'border-indigo-400 text-zinc-100 focus:border-indigo-700' : style + 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-gray-300 focus:text-zinc-300	 focus:border-gray-300';

	return (
		<GlobalLayout>
			<>
				<NavLink to='/' className={navlinkClass}>
					Home Display
				</NavLink>

				<NavLink to='/image' className={navlinkClass}>
					Image Display
				</NavLink>

				<NavLink to='/video' className={navlinkClass}>
					Video Display
				</NavLink>

				<NavLink to='/game' className={navlinkClass}>
					Game
				</NavLink>

				<NavLink to='/admin' className={navlinkClass}>
					Admin
				</NavLink>
			</>
		</GlobalLayout>
	);
}
