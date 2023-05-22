import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

//TODO unload on page change, and add a loader

export default function GameDisplay() {
	const { unityProvider, unload } = useUnityContext({
		loaderUrl: 'SpaceTest/Build/SpaceTest.loader.js',
		dataUrl: 'SpaceTest/Build/SpaceTest.data',
		frameworkUrl: 'SpaceTest/Build/SpaceTest.framework.js',
		codeUrl: 'SpaceTest/Build/SpaceTest.wasm',
		productName: 'SpaceTest',
		productVersion: '1.0.0',
		companyName: 'Alexandre Fourcoux',
	});

	async function handleClickBack() {
		await unload();
		// Ready to navigate to another page.
	}

	return (
		<div>
			<Unity unityProvider={unityProvider} style={{ width: 960, height: 600 }} />
			<button onClick={handleClickBack}>Back</button>
		</div>
	);
}
