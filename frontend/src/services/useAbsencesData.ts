// src/hooks/useAbsencesData.ts
import { useState, useEffect } from "react";
import { getAbsencesData, AbsenceData } from "../services/absences";

export const useAbsencesData = () => {
	const [data, setData] = useState<AbsenceData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const absenceData = await getAbsencesData();
				setData(absenceData);
			} catch (err) {
				setError("Failed to fetch absence data");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return { data, loading, error };
};
