import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

export default function Test() {
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate('admin/test');
			} else {
				navigate('admin');
			}
		});
	}, []);

	/*
	useEffect(() => {
		let authToken = sessionStorage.getItem('Auth Token');
		console.log('authToken', authToken);
	}, []);
	*/

	//TODO check if user.refreshToken == authToken proceed or go to login

	return <div>Test</div>;
}
