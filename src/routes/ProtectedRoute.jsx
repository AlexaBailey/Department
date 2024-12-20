/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { Spinner } from '../../components';
import { logout } from '../../store/slices/auth/auth-slice';
import { setupMiddleWare } from '../../utils/axios/interceptors';

export const ProtectedRoute = () => {
	const { checkAuth, user } = useAuth();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setupMiddleWare(handleLogout);
	}, []);

	useEffect(() => {
		const authenticate = async () => {
			const result = await checkAuth();
			setIsAuthenticated(result);
			setLoading(false);
		};
		authenticate();
	}, [checkAuth]);

	const handleLogout = () => {
		dispatch(logout());
		navigate('logout');
	};

	if (loading) {
		return <Spinner fullWindow />;
	}

	if ((!loading && !isAuthenticated) || !user) {
		return <Navigate to="login" replace />;
	}

	return <Outlet />;
};
