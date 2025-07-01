// src/api/auth.ts
import api from "axios";
import { AuthService } from "./authService"; // Adjust the import path as necessary
interface PasswordChangeData {
	new_password: string;
	confirm_password: string;
}

export const changePassword = async (data: PasswordChangeData) => {
	const csrfToken = await AuthService.getCsrfToken();
	const response = await api.post(
		"http://localhost:8000/api/change-password/",
		data,
		{
			headers: {
				"X-CSRFToken": csrfToken,
			},
		}
	);
	return response.data;
};
