import React from 'react';

//<InputText type={} name={} id={} label={} value={} errorMessage={} disabled={} onChange={}/>

export default function InputText({ type, name, id, label, value, errorMessage, disabled, onChange }) {
	return (
		<>
			<label htmlFor={name + '_' + id} className='flex justify-between text-base'>
				<span className='font-semibold'>{label}</span>
				<span className='text-[#8759B4]'>{errorMessage}</span>
			</label>

			<input
				type={type}
				name={name}
				id={name + '_' + id}
				autoComplete='off'
				className={
					'border-zinc-800 focus:border-[#8759B4] focus:ring-[#8759B4] rounded shadow-sm mt-1 block w-full ' +
					(disabled ? 'bg-zinc-800' : 'bg-zinc-600')
				}
				value={value}
				disabled={disabled}
				onChange={onChange}
			/>
		</>
	);
}
