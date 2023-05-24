import React, { useState, useEffect } from 'react';

export default function HomeDisplay() {
	useEffect(() => {
		document.title = 'Alexandre Fourcoux';
	}, []);

	return <>HomeDisplay</>;
}
