import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import './index.css';

//Public
import PublicLayout from './layouts/PublicLayout.jsx';
import HomeDisplay from './pages/public/HomeDisplay.jsx';
import ImageDisplay from './pages/public/ImageDisplay.jsx';
import VideoDisplay from './pages/public/VideoDisplay.jsx';
import GameDisplay from './pages/public/GameDisplay';
import Contact from './pages/public/Contact';

//Admin
import AdminLayout from './layouts/AdminLayout.jsx';
import HomeManage from './pages/admin/HomeManage.jsx';
import ImageManage from './pages/admin/ImageManage.jsx';
import VideoManage from './pages/admin/VideoManage.jsx';
import GameManage from './pages/admin/GameManage';

//Global
import GlobalLayout from './layouts/GlobalLayout';
import Login from './pages/Login';
import Error from './pages/Error';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='/admin'>
				<Route element={<GlobalLayout />}>
					<Route path='' element={<Login />} />
				</Route>

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
				<Route path='/contact' element={<Contact />} />
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
