import React from 'react';

export default function InputNumber({ name, id, label, value, min, max, disabled, onChange }) {
	return (
		<>
			<label htmlFor={name + '_' + id} className='flex text-base'>
				<span className='text-zinc-700 font-semibold '>{label}</span>
			</label>
			<input
				type='number'
				name={name}
				id={name + '_' + id}
				className={
					'border-zinc-700 focus:border-[#8759B4] focus:ring-[#8759B4] rounded-md shadow-sm mt-1 block w-16 ' +
					(disabled ? 'bg-zinc-400' : 'bg-violet-50')
				}
				min={min}
				max={max}
				value={value}
				disabled={disabled}
				onChange={onChange}
			/>
		</>
	);
}
