import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function GlobalLayout({ children }) {
	const [navOpen, setNavOpen] = useState(false);

	const handleNav = () => {
		setNavOpen(!navOpen);
	};

	const navRef = useRef();

	useEffect(() => {
		function handleClickOutside(event) {
			if (navRef.current && !navRef.current.contains(event.target)) {
				setNavOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [navRef]);

	return (
		<div className='min-h-screen bg-zinc-800 sm:px-4 lg:px-12 font-serif text-violet-50'>
			<div className='sticky top-0 z-50 lg:pt-4 pt-2' ref={navRef}>
				<div className='flex pl-4 sm:hidden'>
					<button onClick={() => handleNav()} className='flex sm:hidden h-10 w-10 justify-center items-center'>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' className='w-6 h-6 '>
							<path
								d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z'
								fill={navOpen ? '#8759B4' : '#f5f3ff'}
							/>
						</svg>
					</button>
				</div>

				<nav
					className={
						'sm:hidden absolute z-50 flex flex-col w-full bg-zinc-800/95 duration-300 origin-top ' + (navOpen ? ' scale-y-100' : 'scale-y-0')
					}
					onClick={handleNav}
				>
					{children}
				</nav>

				<nav className='sm:flex hidden lg:justify-end sm:justify-between sm:gap-1 lg:gap-16 h-8 text-lg lg:text-xl mb-4 bg-zinc-800'>{children}</nav>
			</div>

			<div className='overflow-y-auto'>
				<div className='lg:h-[calc(100vh-7rem)] h-[calc(100vh-6rem)] flex flex-col relative'>
					<Outlet />
				</div>
			</div>

			<div className='h-12 flex w-full justify-center items-center'>
				<a href='https://github.com/Siergfied' target='_blank' className='text-zinc-700 sm:text-sm text-xs flex hover:bg-zinc-400 px-1 rounded'>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='w-3 mr-1'>
						<path
							d='M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z'
							fill='#3f3f46'
						/>
					</svg>
					Site réalisé par Axel Damart pour une personne clueless
				</a>
			</div>
		</div>
	);
}
