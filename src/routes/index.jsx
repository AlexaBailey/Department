import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Spinner } from '../components';
import { Login } from './Auth/pages';
import { APP_ROUTES_PATH } from '../constants';
import { ProtectedRoute } from './Auth/ProtectedRoute';
import { Layout } from '../components/adaptive/Layout';

const Attestations = lazy(() => import('./Attestations/pages/Attestations'));
const Students = lazy(() => import('./Students/pages/Students'));
const Teachers = lazy(() => import('./Teachers/pages/Teachers'));
const Groups = lazy(() => import('./Groups/pages/Groups'));
const Subjects = lazy(() => import('./Subjects/pages/Subjects'));
const Settings = lazy(() => import('./Settings/pages/Settings/Settings'));
const Logs = lazy(() => import('./Logs/pages/Logs/Logs'));

const AppRoutes = () => {
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar
				closeOnClick
				pauseOnHover
				icon={false}
				draggable
				stacked={true}
				style={{ top: '10px', right: '10px' }}
			/>

			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path={APP_ROUTES_PATH.login} element={<Login />} />
					<Route
						path="/*"
						element={
							<Routes>
								<Route element={<ProtectedRoute />}>
									<Route element={<Layout />}>
										<Route
											path={APP_ROUTES_PATH.attestations}
											element={<Attestations />}
										/>
										<Route
											path={APP_ROUTES_PATH.students}
											element={<Students />}
										/>
										<Route
											path={APP_ROUTES_PATH.teachers}
											element={<Teachers />}
										/>
										<Route path={APP_ROUTES_PATH.groups} element={<Groups />} />
										<Route
											path={APP_ROUTES_PATH.subjects}
											element={<Subjects />}
										/>
										<Route
											path={APP_ROUTES_PATH.settings}
											element={<Settings />}
										/>
										<Route path={APP_ROUTES_PATH.logs} element={<Logs />} />
										<Route
											path="*"
											element={
												<Navigate to={APP_ROUTES_PATH.attestations} replace />
											}
										/>
									</Route>
								</Route>
							</Routes>
						}
					/>
					<Route path="*" element={<Navigate to="login" replace />} />
				</Routes>
			</Suspense>
		</>
	);
};

export default AppRoutes;
