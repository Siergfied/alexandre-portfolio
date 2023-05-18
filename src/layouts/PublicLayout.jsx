import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
	return (
		<div className='min-h-screen bg-gray-100 '>
			<div className='py-12'>
				<Outlet />
			</div>
		</div>
	);
}
