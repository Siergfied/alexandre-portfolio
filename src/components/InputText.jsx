import React from 'react';

export default function InputText({ type, name, id, label, value, errorMessage, disabled, onChange }) {
	return (
		<>
			<label htmlFor={name + '_' + id} className='flex justify-between text-base'>
				<span className='text-zinc-700 font-semibold '>{label}</span>
				<span className='text-red-600'>{errorMessage}</span>
			</label>

			<input
				type={type}
				name={name}
				id={name + '_' + id}
				autoComplete='off'
				className={
					'border-zinc-700 focus:border-[#8759B4] focus:ring-[#8759B4] rounded-md shadow-sm mt-1 block w-full ' +
					(disabled ? 'bg-zinc-400' : 'bg-violet-50')
				}
				value={value}
				disabled={disabled}
				onChange={onChange}
			/>
		</>
	);
}
