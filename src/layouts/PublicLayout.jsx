import React from 'react';
import { NavLink } from 'react-router-dom';

import GlobalLayout from './GlobalLayout';

export default function MainLayout() {
	const style = 'inline-flex items-center px-1 border-b-2 font-medium leading-5 uppercase focus:outline-none transition duration-300 ease-in-out ';

	const navlinkClass = ({ isActive }) =>
		isActive ? style + 'border-[#8759B4] text-violet-50 focus:border-[#8759B4]' : style + 'border-transparent text-zinc-400 hover:text-violet-50 hover:border-violet-50 focus:text-violet-50 focus:border-violet-50';

	return (
		<GlobalLayout>
			<>
				<NavLink to='/' className={navlinkClass}>
					Présentation
				</NavLink>

				<NavLink to='/realisations' className={navlinkClass}>
					Réalisations
				</NavLink>

				<NavLink to='/videos' className={navlinkClass}>
					Vidéos
				</NavLink>

				<NavLink to='/demo' className={navlinkClass}>
					Démo
				</NavLink>

				<NavLink to='/contact' className={navlinkClass}>
					Contact
				</NavLink>

				<NavLink to='/admin' className={navlinkClass}>
					Admin
				</NavLink>
			</>
		</GlobalLayout>
	);
}
