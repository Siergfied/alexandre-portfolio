import React from 'react';
import { Outlet } from 'react-router-dom';

export default function GlobalLayout({ children }) {
	return (
		<div className='min-h-screen bg-zinc-800 p-8 font-serif'>
			<div className='mx-auto'>
				<nav className='sticky top-0 z-50 flex justify-end gap-16 h-12 text-xl mb-4'>{children}</nav>

				<div className='overflow-y-auto'>
					<div className='h-[calc(100vh-8rem)] flex flex-col relative'>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
