import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';

import Login from './pages/Login';

import HomeDisplay from './pages/HomeDisplay.jsx';
import HomeManage from './pages/HomeManage.jsx';

import ImageDisplay from './pages/ImageDisplay.jsx';
import ImageManage from './pages/ImageManage.jsx';

import VideoDisplay from './pages/VideoDisplay.jsx';
import VideoManage from './pages/VideoManage.jsx';

import Test from './pages/Test.jsx';
import Error from './pages/Error';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='/admin'>
				<Route path='' element={<Login />} />
				<Route element={<AdminLayout />}>
					<Route path='test' element={<Test />} />
					<Route path='home_display' element={<HomeDisplay />} />
					<Route path='home_manage' element={<HomeManage />} />
					<Route path='image_display' element={<ImageDisplay />} />
					<Route path='image_manage' element={<ImageManage />} />
					<Route path='video_display' element={<VideoDisplay />} />
					<Route path='video_manage' element={<VideoManage />} />
					<Route path='*' element={<Error />} />
				</Route>
			</Route>

			<Route element={<PublicLayout />}>
				<Route path='/' element={<HomeDisplay />} />
				<Route path='/image' element={<ImageDisplay />} />
				<Route path='/video' element={<VideoDisplay />} />
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
