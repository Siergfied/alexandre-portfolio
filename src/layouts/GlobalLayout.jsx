import React from 'react';
import { Outlet } from 'react-router-dom';

export default function GlobalLayout({ children }) {
	return (
		<div className='min-h-screen bg-[#494D60] px-12 pt-4 pb-12 font-serif text-amber-50'>
			<div className='mx-auto'>
				<nav className='sticky top-0 z-50 flex justify-end gap-16 h-8 text-xl mb-4'>{children}</nav>

				<div className='overflow-y-auto'>
					<div className='h-[calc(100vh-7rem)] flex flex-col relative'>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
