import React from 'react';

export default function Textarea({ name, id, label, value, errorMessage, disabled, onChange }) {
	return (
		<>
			<label htmlFor={name + '_' + id} className='flex justify-between text-base '>
				<span className='text-zinc-700 font-semibold '>{label}</span>
				<span className='text-red-600'>{errorMessage}</span>
			</label>
			<textarea
				name={name}
				id={name + '_' + id}
				className={
					'border-zinc-800 focus:border-[#8759B4] focus:ring-[#8759B4] rounded-md shadow-sm mt-1 block w-full h-full resize-none ' +
					(disabled ? 'bg-zinc-400' : 'bg-violet-50')
				}
				value={value}
				disabled={disabled}
				onChange={onChange}
			/>
		</>
	);
}
