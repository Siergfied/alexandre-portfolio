import React from 'react';

export default function Textarea({ name, id, label, value, errorMessage, disabled, onChange }) {
	return (
		<>
			<label htmlFor={name + '_' + id} className='flex justify-between text-base'>
				<span className='font-semibold'>{label}</span>
				<span className='text-[#8759B4]'>{errorMessage}</span>
			</label>
			<textarea
				name={name}
				id={name + '_' + id}
				className={
					'border-zinc-800 focus:border-[#8759B4] focus:ring-[#8759B4] rounded shadow-sm mt-1 block w-full h-full resize-none ' +
					(disabled ? 'bg-zinc-800' : 'bg-zinc-600')
				}
				value={value}
				disabled={disabled}
				onChange={onChange}
			/>
		</>
	);
}
