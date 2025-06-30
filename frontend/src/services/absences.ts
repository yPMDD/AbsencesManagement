// src/api/absences.ts
import axios from "axios";

const API_URL = "http://localhost:8000/api/absences_stats/";

export interface AbsenceData {
	school_metrics: {
		total_students: number;
		total_absences: number;
		students_with_absences: number;
		absence_rate: number;
	};
	top_courses: {
		class_name: string;
		absence_count: number;
	}[];
	latest_absences: {
		matricule: string;
		date: string;
		class_name: string;
		full_name: string;
		reason: string;
	}[];
}

export const getAbsencesData = async (): Promise<AbsenceData> => {
	try {
		const response = await axios.get<AbsenceData>(`${API_URL}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching absence data:", error);
		throw error;
	}
};
