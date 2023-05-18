// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD1zO3B7umfbsu_4zmbqZ-rshXtH6xyE0A',
	authDomain: 'alexandre-port.firebaseapp.com',
	projectId: 'alexandre-port',
	storageBucket: 'alexandre-port.appspot.com',
	messagingSenderId: '935991508515',
	appId: '1:935991508515:web:b74da69558080037eafb96',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Authentication and get a reference to the service
export const auth = getAuth();
