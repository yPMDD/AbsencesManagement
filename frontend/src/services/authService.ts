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
interface Student {
	id: number;
	full_name: string;
	email: string;
	matricule: string;
	major: string;
	city: string;
	phone_number: string;
}

interface StudentRegistrationData {
	username: string;
	guardianEmail: string;
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	city?: string;
	phone_number?: string;
	matricule?: string;
	major?: string;
}
interface AbsenceData {
	matricule: string;
	date: string;
	class_name: string;
	reason?: string;
	full_name?: string;
}

interface AuthResponse {
	authenticated: boolean;
	user?: User;
}

interface AbsenceReportData {
	student_id?: number;
	course_id?: number;
	format: "pdf" | "xlsx";
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
	registerAbsence: async (
		AbsenceData: AbsenceData
	): Promise<{ success: string }> => {
		const csrfToken = await AuthService.getCsrfToken();
		const response = await api.post("absences/register/", AbsenceData, {
			headers: {
				"X-CSRFToken": csrfToken,
			},
		});
		console.log("Absence registration response:", response.data);
		return response.data;
	},
	generateReport: async (reportData: AbsenceReportData): Promise<void> => {
		const csrfToken = await AuthService.getCsrfToken();
		const response = await api.post("absences/report/", reportData, {
			responseType: "blob",
			headers: { "X-CSRFToken": csrfToken },
		});
		console.log("Generating report with:", { reportData });

		return response.data;
	},

	getStudents: async (): Promise<Student[]> => {
		const response = await api.get("students/");
		return response.data;
	},
	getAbsences: async (): Promise<{ absences: AbsenceData }> => {
		const response = await api.get("absences/");
		console.log("Absences data:", response.data);
		return response.data;
	},
	getAbsencesByStudentId: async (studentId: number): Promise<Student> => {
		const response = await api.get(`absences/${studentId}/`);
		return response.data;
	},
	registerStudent: async (
		studentData: StudentRegistrationData
	): Promise<{ success: string }> => {
		const csrfToken = await AuthService.getCsrfToken();

		const response = await api.post("auth/register/student/", studentData, {
			headers: {
				"X-CSRFToken": csrfToken,
			},
		});
		return response.data;
	},
	deleteStudent: async (studentId: number): Promise<{ success: string }> => {
		const csrfToken = await AuthService.getCsrfToken();

		const response = await api.delete(`students/${studentId}/delete/`, {
			headers: {
				"X-CSRFToken": csrfToken,
			},
		});
		return response.data;
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
		// console.log("Login response:", response.data);
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

export { AuthService, type User, type AuthResponse, type Student };
