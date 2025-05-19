// useAuth.ts
import { useState, useEffect } from "react";
// import { AuthService, type User, type AuthResponse } from './authService';
import { AuthService, type User } from "./authService";

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	isLoading: boolean;
	error: string | null;
}

const useAuth = () => {
	const [authState, setAuthState] = useState<AuthState>({
		isAuthenticated: false,
		user: null,
		isLoading: true,
		error: null,
	});

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { authenticated, user } = await AuthService.checkAuth();
				setAuthState({
					isAuthenticated: authenticated,
					user: user || null,
					isLoading: false,
					error: null,
				});
			} catch (err) {
				console.error("Error checking authentication:", err);
				setAuthState({
					isAuthenticated: false,
					user: null,
					isLoading: false,
					error: "Failed to check authentication",
				});
			}
		};

		checkAuth();
	}, []);

	const login = async (username: string, password: string) => {
		setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
		try {
			const { user } = await AuthService.login(username, password);
			setAuthState({
				isAuthenticated: true,
				user,
				isLoading: false,
				error: null,
			});
		} catch (err) {
			console.error("Login error:", err);
			setAuthState({
				isAuthenticated: false,
				user: null,
				isLoading: false,
				error: "Login failed. Please check your credentials.",
			});
		}
	};

	const logout = async () => {
		try {
			await AuthService.logout();
			setAuthState({
				isAuthenticated: false,
				user: null,
				isLoading: false,
				error: null,
			});
		} catch (err) {
			console.error("Logout error:", err);
			setAuthState((prev) => ({ ...prev, error: "Logout failed" }));
		}
	};

	return { ...authState, login, logout };
};

export default useAuth;
