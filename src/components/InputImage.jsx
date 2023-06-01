import React from 'react';

import { buttonStylePrimarySmall } from './ButtonStyle.jsx';

export default function InputImage({ name, id, label, width, height, image, imageSource, accept, errorMessage, disabled, onChange }) {
	return (
		<>
			<div className='flex justify-between text-base '>
				<span className='text-zinc-700 font-semibold '>{label}</span>
				<span className='text-red-600'>{errorMessage}</span>
			</div>
			<div
				className={
					'relative flex items-center justify-center rounded-md shadow-sm mt-1 border border-zinc-700 ' + (disabled ? 'bg-zinc-400' : 'bg-violet-50')
				}
			>
				<div className={'z-0 m-2 flex items-center' + ' ' + width + ' ' + height}>{image && <img src={imageSource} alt='' className='w-full' />}</div>
				{!disabled && (
					<label htmlFor={name + '_' + id} className={'z-10 absolute cursor-pointer ' + buttonStylePrimarySmall}>
						{image && 'Modifier'}
						{!image && 'Parcourir'}
					</label>
				)}

				<input type='file' accept={accept} name={name} id={name + '_' + id} onChange={onChange} disabled={disabled} className='hidden' />
			</div>
		</>
	);
}
