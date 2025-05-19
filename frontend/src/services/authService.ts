import axios from "axios";
// import axios, { AxiosResponse } from 'axios';
interface User {
	id: number;
	username: string;
	email: string;
	role: "Staff" | "student";
	full_name: string;
	picture: string | null;
}

interface AuthResponse {
	authenticated: boolean;
	user?: User;
}

const api = axios.create({
	baseURL: "http://localhost:8000/api/",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

const getCookie = (name: string): string | null => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
	return null;
};

const AuthService = {
	getCsrfToken: async (): Promise<string> => {
		await api.get("auth/csrf/");
		const csrfToken = getCookie("csrftoken");
		if (!csrfToken) throw new Error("CSRF token not found in cookies");
		return csrfToken;
	},

	login: async (
		username: string,
		password: string
	): Promise<{ user: User }> => {
		const csrfToken = await AuthService.getCsrfToken();
		const response = await api.post(
			"auth/login/",
			{ username, password },
			{
				headers: {
					"X-CSRFToken": csrfToken,
				},
			}
		);
		return response.data;
	},

	logout: async (): Promise<void> => {
		try {
			// Get fresh CSRF token first
			await AuthService.getCsrfToken();

			// Make logout request
			await api.post(
				"auth/logout/",
				{},
				{
					headers: {
						"X-CSRFToken": getCookie("csrftoken") || "",
					},
				}
			);

			// Clear any stored tokens/user data
			delete api.defaults.headers.common["X-CSRFToken"];
		} catch (error) {
			console.error("Logout failed:", error);
			throw error;
		}
	},

	checkAuth: async (): Promise<AuthResponse> => {
		try {
			const response = await api.get("auth/check/");
			return response.data;
		} catch (error) {
			console.error("Error checking authentication:", error);
			return { authenticated: false };
		}
	},
};

api.interceptors.request.use(async (config) => {
	if (
		!["get", "head", "options"].includes(config.method?.toLowerCase() || "")
	) {
		const token = await AuthService.getCsrfToken();
		config.headers["X-CSRFToken"] = token;
	}
	return config;
});

export { AuthService, type User, type AuthResponse };
