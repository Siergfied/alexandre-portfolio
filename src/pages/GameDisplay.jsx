import React from 'react';

export default function GameDisplay() {
	return (
		<div className='flex h-full px-24 py-12 bg-gradient-to-b from-zinc-300 via-zinc-700 to-zinc-800'>
			<div className='flex  border-8 border-red-600 w-fit h-full'>
				<iframe src='https://i.simmer.io/@Siergfied/test' className='aspect-video h-full'></iframe>
			</div>
		</div>
	);
}

/*
style={{ width: 960, height: 600 }}*/
