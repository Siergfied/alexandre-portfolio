import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout.jsx';
import MainLayout from './layouts/PublicLayout.jsx';

import Login from './pages/Login';

import HomeDisplay from './pages/HomeDisplay.jsx';
import HomeManage from './pages/HomeManage.jsx';

import ImageDisplay from './pages/ImageDisplay.jsx';
import ImageManage from './pages/ImageManage.jsx';

import VideoDisplay from './pages/VideoDisplay.jsx';
import VideoManage from './pages/VideoManage.jsx';

import Test from './pages/Test.jsx';

const router = createBrowserRouter([
	{
		path: '/admin',
		children: [
			{
				path: '',
				element: <Login />,
			},
			{
				path: '',
				element: <AdminLayout />,
				children: [
					{
						path: 'test',
						element: <Test />,
					},
					{
						path: 'home_display',
						element: <HomeDisplay />,
					},
					{
						path: 'home_manage',
						element: <HomeManage />,
					},
					{
						path: 'image_display',
						element: <ImageDisplay />,
					},
					{
						path: 'image_manage',
						element: <ImageManage />,
					},
					{
						path: 'video_display',
						element: <VideoDisplay />,
					},
					{
						path: 'video_manage',
						element: <VideoManage />,
					},
				],
			},
		],
	},
	{
		path: '/',
		element: <HomeDisplay />,
	},
	{
		path: '/image',
		element: <ImageDisplay />,
	},
	{
		path: '/video',
		element: <VideoDisplay />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
