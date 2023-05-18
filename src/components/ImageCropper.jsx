import React, { useState, useCallback } from 'react';

import Cropper from 'react-easy-crop';

export default function ImageCropper({ originalImage, aspectRatio, imageCroppedState, closeCropper }) {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const createImage = (url) => {
		return new Promise((resolve, reject) => {
			let image = new Image();
			image.addEventListener('load', () => resolve(image));
			image.addEventListener('error', (error) => reject(error));
			image.src = url;
		});
	};

	async function getCroppedImage(imageSrc, pixelCrop) {
		const image = await createImage(imageSrc);

		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		canvas.width = image.width;
		canvas.height = image.height;

		context.drawImage(image, 0, 0);

		const data = context.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

		canvas.width = pixelCrop.width;
		canvas.height = pixelCrop.height;

		context.putImageData(data, 0, 0);

		return new Promise((resolve, reject) => {
			new Blob([
				canvas.toBlob(
					(file) => {
						resolve({ file: file, url: URL.createObjectURL(file) });
					},
					'image/webp',
					0.9
				),
			]);
		});
	}

	const setCroppedImage = useCallback(async () => {
		try {
			const croppedImage = await getCroppedImage(originalImage, croppedAreaPixels);
			imageCroppedState(croppedImage);
			closeCropper();
		} catch (error) {
			console.error(error);
		}
	}, [croppedAreaPixels]);

	return (
		<>
			<div className='relative h-full bg-white'>
				<Cropper
					image={originalImage}
					aspect={aspectRatio}
					crop={crop}
					zoom={zoom}
					showGrid={true}
					onCropChange={setCrop}
					onZoomChange={setZoom}
					onCropComplete={onCropComplete}
					style={{
						containerStyle: {
							width: '100%',
							height: '100%',
							backgroundColor: 'white',
						},
					}}
				/>
			</div>

			<div className='flex justify-center mt-6'>
				<button
					className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'
					onClick={setCroppedImage}
				>
					Recadrer
				</button>
			</div>
		</>
	);
}
