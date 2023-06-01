import React, { useState } from 'react';

import InputNumber from '../InputNumber.jsx';
import InputImage from '../InputImage.jsx';
import InputText from '../InputText.jsx';

import { formStyle } from '../../layouts/Style.jsx';

export default function LinkForm({ id, order, setOrder, maxOrder, icon, setIcon, title, setTitle, url, setUrl, formAction, disabled, children }) {
	const [iconError, setIconError] = useState();
	const [titleError, setTitleError] = useState();
	const [urlError, setUrlError] = useState();

	const handleOrder = (event) => {
		if (event.target.value == '' || event.target.value > maxOrder || event.target.value < 1) {
			event.target.value = order;
		}
		setOrder(event.target.value);
	};

	const handleIcon = async (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = function () {
				setIcon(reader.result);
			};
		}
		setIconError();
	};

	const handleTitle = (event) => {
		setTitle(event.target.value);
		setTitleError();
	};

	const handleUrl = (event) => {
		setUrl(event.target.value);
		setUrlError();
	};

	const handleForm = (event) => {
		event.preventDefault();

		!icon && setIconError('Requis');
		!title && setTitleError('Requis');
		!url && setUrlError('Requis');

		if (!icon || !title || !url) return;

		formAction(event);
	};

	return (
		<form onSubmit={handleForm} className={formStyle} id={id + order}>
			<div>
				<InputNumber name={'order'} id={id} label={'Ordre'} value={order} min={1} max={maxOrder} disabled={disabled} onChange={handleOrder} />
			</div>

			<div>
				<InputImage
					name={'icon'}
					id={id}
					label={'Icône'}
					width={'h-20'}
					height={'w-20'}
					image={icon}
					imageSource={icon}
					accept={'.svg, .png'}
					errorMessage={iconError}
					disabled={disabled}
					onChange={handleIcon}
				/>
			</div>

			<div className='flex flex-col w-full h-full'>
				<div className='flex gap-2'>
					<div className='flex flex-col w-1/3'>
						<InputText
							type={'text'}
							name={'title'}
							id={id}
							label={'Titre'}
							value={title}
							errorMessage={titleError}
							disabled={disabled}
							onChange={handleTitle}
						/>
					</div>

					<div className='flex flex-col w-2/3'>
						<InputText
							type={'url'}
							name={'url'}
							id={id}
							label={'URL'}
							value={url}
							errorMessage={urlError}
							disabled={disabled}
							onChange={handleUrl}
						/>
					</div>
				</div>

				<div className='flex justify-end w-full gap-12 mt-6'> {children}</div>
			</div>
		</form>
	);
}
