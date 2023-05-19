import React from 'react';

export default function Error() {
	return (
		<div className='flex flex-col h-full w-full items-center'>
			<h1 className='mt-8 text-9xl font-bold uppercase'>Error 404</h1>
			<p className='mt-8 text-3xl font-bold uppercase'> Oups! La page que vous demandez n'existe pas.</p>
		</div>
	);
}
