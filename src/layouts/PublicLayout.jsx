import React from 'react';
import { NavLink } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import GlobalLayout from './GlobalLayout';

export default function MainLayout() {
	const style = 'sm:flex items-center sm:px-1 px-4 py-2 sm:py-0 border-b-2 font-medium leading-5 uppercase focus:outline-none transition duration-300 ease-in-out ';

	const navlinkClass = ({ isActive, modifier }) =>
		isActive
			? style + 'border-[#8759B4] text-violet-50 sm:focus:border-[#8759B4] bg-zinc-700 sm:bg-transparent ' + modifier
			: style +
			  'sm:border-transparent border-[#8759B4] text-zinc-400 hover:text-violet-50 hover:border-violet-50 focus:text-violet-50 focus:border-violet-50 ' +
			  modifier;

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

				{isMobile ? (
					''
				) : (
					<NavLink to='/demo' className={navlinkClass({ modifier: ' hidden' })}>
						Démo
					</NavLink>
				)}

				<NavLink to='/contact' className={navlinkClass}>
					Contact
				</NavLink>
			</>
		</GlobalLayout>
	);
}
