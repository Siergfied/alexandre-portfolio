import React, { useState } from 'react';

import ImageCropper from './ImageCropper.jsx';
import Modal from './Modal.jsx';

export default function ImageForm({ id, title, description, formHandler, disabled, coverImageCropped, setCoverImageCropped, backgroundImageCropped, setBackgroundImageCropped, children }) {
	const handleChange = (event, setImageState) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = function () {
				setImageState(reader.result);
			};
		}
	};

	const [coverImage, setCoverImage] = useState();
	const [backgroundImage, setBackgroundImage] = useState();

	const [modalIsOpen, setModalIsOpen] = useState(false);

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const [modalContent, setModalContent] = useState('');

	const handleCover = (event) => {
		handleChange(event, setCoverImage);
		setModalContent('cover');
		setModalIsOpen(true);
	};

	const handleBackground = (event) => {
		handleChange(event, setBackgroundImage);
		setModalContent('background');
		setModalIsOpen(true);
	};

	const handleCoverImageCropped = () => {
		if (typeof coverImageCropped === 'object') {
			return coverImageCropped.url;
		} else {
			return coverImageCropped;
		}
	};

	const handleBackgroundImageCropped = () => {
		if (typeof backgroundImageCropped === 'object') {
			return backgroundImageCropped.url;
		} else {
			return backgroundImageCropped;
		}
	};

	return (
		<>
			<div className='bg-white shadow sm:rounded-lg sm:p-6'>
				<form onSubmit={formHandler} className='flex gap-6' id={id}>
					<div>
						<label className='block font-medium text-sm text-gray-700'>Cover</label>
						<div className={'relative flex items-center justify-center rounded-md mt-1 border border-gray-300 ' + (disabled ? 'bg-zinc-200' : '')}>
							<div className='z-0 h-48 w-36 m-2 '>{coverImageCropped && <img src={handleCoverImageCropped()} className='w-full' />}</div>
							{!disabled && (
								<label
									htmlFor={id + '_cover'}
									className='z-10 absolute inline-flex items-center justify-center px-4 py-2 bg-zinc-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 cursor-pointer w-32'
								>
									{coverImageCropped && 'Modifier'}
									{!coverImageCropped && 'Sélectionner'}
								</label>
							)}

							<input type='file' name='cover' id={id + '_cover'} onChange={handleCover} disabled={disabled} className='hidden' />
						</div>
					</div>

					<div>
						<label className='block font-medium text-sm text-gray-700'>Background</label>
						<div className={'relative flex items-center justify-center rounded-md mt-1 border border-gray-300 ' + (disabled ? 'bg-zinc-200' : '')}>
							<div className='z-0 h-48 w-96 m-2'>{backgroundImageCropped && <img src={handleBackgroundImageCropped()} className='w-full' />}</div>
							{!disabled && (
								<label
									htmlFor={id + '_background'}
									className='z-10 absolute inline-flex items-center justify-center px-4 py-2 bg-zinc-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 cursor-pointer w-32'
								>
									{backgroundImageCropped && 'Modifier'}
									{!backgroundImageCropped && 'Sélectionner'}
								</label>
							)}

							<input type='file' name='background' id={id + '_background'} onChange={handleBackground} disabled={disabled} className='hidden' />
						</div>
					</div>

					<div className='flex flex-col grow'>
						<div>
							<label htmlFor={id + '_title'} className='block font-medium text-sm text-gray-700'>
								Titre
							</label>
							<input
								type='text'
								name='title'
								id={id + '_title'}
								autoComplete='off'
								className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ' + (disabled ? 'bg-zinc-200' : '')}
								defaultValue={title}
								disabled={disabled}
							/>
						</div>

						<div className='mt-1 flex flex-col h-full'>
							<label htmlFor={id + '_description'} className='block font-medium text-sm text-gray-700'>
								Description
							</label>
							<textarea
								name='description'
								id={id + '_description'}
								className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-full resize-none ' + (disabled ? 'bg-zinc-200' : '')}
								defaultValue={description}
								disabled={disabled}
							/>
						</div>
					</div>

					<div className='flex flex-col justify-evenly w-32'> {children}</div>
				</form>
			</div>

			{modalIsOpen && (
				<Modal isOpen={closeModal}>
					{modalContent === 'cover' ? (
						<ImageCropper originalImage={coverImage} aspectRatio={3 / 4} imageCroppedState={setCoverImageCropped} closeCropper={closeModal} />
					) : modalContent === 'background' ? (
						<ImageCropper originalImage={backgroundImage} aspectRatio={2 / 1} imageCroppedState={setBackgroundImageCropped} closeCropper={closeModal} />
					) : (
						''
					)}
				</Modal>
			)}
		</>
	);
}
