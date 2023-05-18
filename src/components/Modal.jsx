import React, { useEffect, useRef } from 'react';

export default function Modal({ children, isOpen }) {
	const wrapperReference = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (wrapperReference.current && !wrapperReference.current.contains(event.target)) {
				isOpen();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = 'unset';
		};
	}, [wrapperReference]);

	return (
		<div className='fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/95 '>
			<div className='flex flex-col mx-auto my-24 max-w-5xl h-3/4 bg-white shadow sm:rounded-lg p-6 ' ref={wrapperReference}>
				{children}
			</div>
		</div>
	);
}
