import React from 'react';

import { buttonStyleImage } from '../layouts/Style.jsx';

export default function InputImage({ name, id, label, width, height, image, imageSource, accept, errorMessage, disabled, onChange }) {
	return (
		<>
			<div className='flex justify-between text-base'>
				<span className='font-semibold'>{label}</span>
				<span className='text-[#8759B4]'>{errorMessage}</span>
			</div>
			<div className={'relative flex items-center justify-center rounded shadow-sm mt-1 border border-zinc-800 ' + (disabled ? 'bg-zinc-800' : 'bg-zinc-600')}>
				<div className={'z-0 m-2 flex items-center' + ' ' + width + ' ' + height}>{image && <img src={imageSource} alt='' className='w-full' />}</div>
				{!disabled && (
					<label htmlFor={name + '_' + id} className={'z-10 absolute cursor-pointer ' + buttonStyleImage}>
						{image && 'Modifier'}
						{!image && 'Parcourir'}
					</label>
				)}

				<input type='file' accept={accept} name={name} id={name + '_' + id} onChange={onChange} disabled={disabled} className='hidden' />
			</div>
		</>
	);
}
