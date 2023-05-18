import { storage } from '../firebase.js';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';

export default async function storeImageFile(file, name) {
	let mime = file.type;
	let extension = mime.split('/').pop();
	let filename = name + '.' + extension;

	const storageRef = ref(storage, `images/${filename}`);

	let imageUrl = await uploadBytes(storageRef, file).then((snapshot) => {
		let response = getDownloadURL(snapshot.ref).then((downloadURL) => {
			return downloadURL;
		});
		return response;
	});
	return imageUrl;
}
