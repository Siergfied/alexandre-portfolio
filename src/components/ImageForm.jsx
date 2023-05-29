import React, { useState } from 'react';

import ImageCropper from './ImageCropper.jsx';
import Modal from './Modal.jsx';

export default function ImageForm({ id, title, setTitle, description, setDescription, formAction, disabled, coverImageCropped, setCoverImageCropped, backgroundImageCropped, setBackgroundImageCropped, children }) {
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

	const [coverError, setCoverError] = useState();
	const [backgroundError, setBackgroundError] = useState();
	const [titleError, setTitleError] = useState();
	const [descriptionError, setDescriptionError] = useState();

	const handleTitle = (event) => {
		setTitle && setTitle(event.target.value);
		setTitleError();
	};

	const handleDescription = (event) => {
		setDescription && setDescription(event.target.value);
		setDescriptionError();
	};

	const handleCover = (event) => {
		handleChange(event, setCoverImage);
		setCoverError();
		setModalContent('cover');
		setModalIsOpen(true);
	};

	const handleBackground = (event) => {
		handleChange(event, setBackgroundImage);
		setBackgroundError();
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

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const handleForm = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		coverImageCropped ? '' : setCoverError('Requis');
		backgroundImageCropped ? '' : setBackgroundError('Requis');
		formJson.title ? '' : setTitleError('Requis');
		formJson.description ? '' : setDescriptionError('Requis');

		if (!coverImageCropped || !backgroundImageCropped || !formJson.title || !formJson.description) return;

		formAction(event);
	};

	return (
		<>
			<form onSubmit={handleForm} className='bg-zinc-100 shadow sm:rounded-lg sm:p-6' id={id}>
				<div className='flex gap-6'>
					<div>
						<label className='flex justify-between font-medium text-sm'>
							<span className='text-zinc-700'>Couverture</span>
							<span className='text-red-600'>{coverError}</span>
						</label>
						<div className={'relative flex items-center justify-center rounded-md mt-1 border border-zinc-400 ' + (disabled ? 'bg-zinc-400' : '')}>
							<div className='z-0 h-64 w-48 m-2 '>{coverImageCropped && <img src={handleCoverImageCropped()} className='w-full' />}</div>
							{!disabled && (
								<label
									htmlFor={id + '_cover'}
									className='z-10 absolute inline-flex items-center justify-center px-4 py-2 bg-zinc-600 border border-transparent rounded-md font-semibold text-xs text-zinc-100 uppercase tracking-widest hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 cursor-pointer w-32'
								>
									{coverImageCropped && 'Modifier'}
									{!coverImageCropped && 'Parcourir'}
								</label>
							)}

							<input type='file' accept='image/*' name='cover' id={id + '_cover'} onChange={handleCover} disabled={disabled} className='hidden' />
						</div>
					</div>

					<div>
						<label className='flex justify-between font-medium text-sm'>
							<span className='text-zinc-700'>Illustration</span>
							<span className='text-red-600'>{backgroundError}</span>
						</label>
						<div className={'relative flex items-center justify-center rounded-md mt-1 border border-zinc-400 ' + (disabled ? 'bg-zinc-400' : '')}>
							<div className='z-0 h-64 w-[32rem] m-2'>{backgroundImageCropped && <img src={handleBackgroundImageCropped()} className='w-full' />}</div>
							{!disabled && (
								<label
									htmlFor={id + '_background'}
									className='z-10 absolute inline-flex items-center justify-center px-4 py-2 bg-zinc-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 cursor-pointer w-32'
								>
									{backgroundImageCropped && 'Modifier'}
									{!backgroundImageCropped && 'Parcourir'}
								</label>
							)}

							<input type='file' accept='image/*' name='background' id={id + '_background'} onChange={handleBackground} disabled={disabled} className='hidden' />
						</div>
					</div>

					<div className='flex flex-col w-full gap-2'>
						<div>
							<label htmlFor={id + '_title'} className='flex justify-between font-medium text-sm '>
								<span className='text-zinc-700'>Titre</span>
								<span className='text-red-600'>{titleError}</span>
							</label>

							<input
								type='text'
								name='title'
								id={id + '_title'}
								autoComplete='off'
								className={'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full ' + (disabled ? 'bg-zinc-400' : ' bg-zinc-100')}
								value={title}
								disabled={disabled}
								onChange={handleTitle}
							/>
						</div>

						<div className='flex flex-col h-full'>
							<label htmlFor={id + '_description'} className='flex justify-between font-medium text-sm'>
								<span className='text-zinc-700'>Description</span>
								<span className='text-red-600'>{descriptionError}</span>
							</label>
							<textarea
								name='description'
								id={id + '_description'}
								className={
									'border-zinc-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-full resize-none ' + (disabled ? 'bg-zinc-400' : 'bg-zinc-100')
								}
								value={description}
								disabled={disabled}
								onChange={handleDescription}
							/>
						</div>
					</div>
				</div>

				<div className='flex justify-end w-full gap-12 mt-4'> {children}</div>
			</form>

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
