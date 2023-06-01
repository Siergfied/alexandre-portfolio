import React, { useState } from 'react';

import ImageCropper from '../ImageCropper.jsx';
import Modal from '../Modal.jsx';

import InputImage from '../InputImage.jsx';
import InputText from '../InputText.jsx';
import Textarea from '../Textarea.jsx';
import InputNumber from '../InputNumber.jsx';

import { formStyle } from '../../layouts/Style.jsx';

export default function ImageForm({
	id,
	order,
	setOrder,
	maxOrder,
	title,
	setTitle,
	description,
	setDescription,
	formAction,
	disabled,
	coverImageCropped,
	setCoverImageCropped,
	backgroundImageCropped,
	setBackgroundImageCropped,
	children,
}) {
	const [coverImage, setCoverImage] = useState();
	const [backgroundImage, setBackgroundImage] = useState();

	const [coverError, setCoverError] = useState();
	const [backgroundError, setBackgroundError] = useState();
	const [titleError, setTitleError] = useState();
	const [descriptionError, setDescriptionError] = useState();

	const handleOrder = (event) => {
		if (event.target.value == '' || event.target.value > maxOrder || event.target.value < 1) {
			event.target.value = order;
		}
		setOrder(event.target.value);
	};

	const handleTitle = (event) => {
		setTitle(event.target.value);
		setTitleError();
	};

	const handleDescription = (event) => {
		setDescription(event.target.value);
		setDescriptionError();
	};

	const handleChange = (event, setImageState) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = function () {
				setImageState(reader.result);
			};
		}
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

		!coverImageCropped && setCoverError('Requis');
		!backgroundImageCropped && setBackgroundError('Requis');
		!title && setTitleError('Requis');
		!description && setDescriptionError('Requis');

		if (!coverImageCropped || !backgroundImageCropped || !title || !description) return;

		formAction(event);
	};

	return (
		<>
			<form onSubmit={handleForm} className={formStyle + 'flex-col'} id={id + order}>
				<div className='flex gap-6'>
					<div>
						<InputNumber
							name={'order'}
							id={id}
							label={'Ordre'}
							value={order}
							min={1}
							max={maxOrder}
							disabled={disabled}
							onChange={handleOrder}
						/>
					</div>

					<div>
						<InputImage
							name={'cover'}
							id={id}
							label={'Couverture'}
							width={'h-48'}
							height={'w-36'}
							image={coverImageCropped}
							imageSource={handleCoverImageCropped()}
							accept={'.png, .jpg, .jpeg, .webp'}
							errorMessage={coverError}
							disabled={disabled}
							onChange={handleCover}
						/>
					</div>

					<div>
						<InputImage
							name={'background'}
							id={id}
							label={'Illustration'}
							width={'h-48'}
							height={'w-96'}
							image={backgroundImageCropped}
							imageSource={handleBackgroundImageCropped()}
							accept={'.png, .jpg, .jpeg, .webp'}
							errorMessage={backgroundError}
							disabled={disabled}
							onChange={handleBackground}
						/>
					</div>

					<div className='flex flex-col w-full gap-2'>
						<div>
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

						<div className='flex flex-col h-full'>
							<Textarea
								name={'description'}
								id={id}
								label={'Description'}
								value={description}
								errorMessage={descriptionError}
								disabled={disabled}
								onChange={handleDescription}
							/>
						</div>
					</div>
				</div>

				<div className='flex justify-end w-full gap-12'> {children}</div>
			</form>

			{modalIsOpen && (
				<Modal isOpen={closeModal}>
					{modalContent === 'cover' ? (
						<ImageCropper originalImage={coverImage} aspectRatio={3 / 4} imageCroppedState={setCoverImageCropped} closeCropper={closeModal} />
					) : modalContent === 'background' ? (
						<ImageCropper
							originalImage={backgroundImage}
							aspectRatio={2 / 1}
							imageCroppedState={setBackgroundImageCropped}
							closeCropper={closeModal}
						/>
					) : (
						''
					)}
				</Modal>
			)}
		</>
	);
}
