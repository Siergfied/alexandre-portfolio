import React, { useState, useEffect } from 'react';

export default function HomeDisplay() {
	useEffect(() => {
		document.title = 'Home - Admin - AF';
	}, []);

	return <>HomeManage</>;
}
