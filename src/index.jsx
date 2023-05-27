import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import './index.css';

//Public
import PublicLayout from './layouts/PublicLayout.jsx';
import HomeDisplay from './pages/HomeDisplay.jsx';
import ImageDisplay from './pages/ImageDisplay.jsx';
import VideoDisplay from './pages/VideoDisplay.jsx';
import GameDisplay from './pages/GameDisplay';

//Admin
import AdminLayout from './layouts/AdminLayout.jsx';
import HomeManage from './pages/HomeManage.jsx';
import ImageManage from './pages/ImageManage.jsx';
import VideoManage from './pages/VideoManage.jsx';

//Global
import Login from './pages/Login';
import Error from './pages/Error';
import GameManage from './pages/GameManage';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='/admin'>
				<Route path='' element={<Login />} />
				<Route element={<AdminLayout />}>
					<Route path='presentation' element={<HomeManage />} />
					<Route path='realisations' element={<ImageManage />} />
					<Route path='videos' element={<VideoManage />} />
					<Route path='demo' element={<GameManage />} />
					<Route path='*' element={<Error />} />
				</Route>
			</Route>

			<Route element={<PublicLayout />}>
				<Route path='/' element={<HomeDisplay />} />
				<Route path='/realisations' element={<ImageDisplay />} />
				<Route path='/videos' element={<VideoDisplay />} />
				<Route path='/demo' element={<GameDisplay />} />
				<Route path='*' element={<Error />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
