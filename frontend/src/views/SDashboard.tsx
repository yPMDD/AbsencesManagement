import Sheader from "../components/Sheader";
import StudentCard from "../components/StudentCard";
import Card from "../components/Card";
import { useMemo } from "react";
import Footer from "../components/Footer";

import { useState, useEffect } from "react";
import { AuthService } from "../services/authService";

interface AbsenceRecord {
	class_name: string;
	date: string;
	full_name: string;
	matricule: string;
	reason: string;
}

const SDashboard = () => {
	const [studentAbsences, setStudentAbsences] = useState<AbsenceRecord[]>([]);
	const state = JSON.parse(localStorage.getItem("user") || "{}");
	console.log("User state:", state);
	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const data = await AuthService.getAbsencesByStudentId(state.user.id);
				console.log("Fetched students:", data);
				setStudentAbsences(data.absences || []);
				console.log("Absences data:", data.absences);
			} catch (error) {
				console.error("Error fetching students:", error);
			}
		};

		fetchStudents();
	}, []);
	const absences = studentAbsences;

	const totalUnjustified = useMemo(
		() => absences.filter((absence) => !absence.reason?.trim()).length,
		[absences]
	);

	// 3. Course with most absences
	const { course: mostAbsentCourse, count: mostAbsentCount } = useMemo(() => {
		const courseCounts = absences.reduce((acc, { class_name }) => {
			acc[class_name] = (acc[class_name] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);

		return Object.entries(courseCounts).reduce(
			(max, [course, count]) => (count > max.count ? { course, count } : max),
			{ course: "", count: 0 }
		);
	}, [absences]);

	return (
		<div>
			<Sheader />
			<div className="ml-80 mr-80 ">
				<div className="pt-4 pb-4 mt-20 ">
					<p className="p-8 mx-auto text-2xl font-bold text-center max-w-prose">
						Student Dashboard
					</p>

					<div className="flex flex-wrap gap-10">
						<StudentCard student={state} />
						<Card number={studentAbsences.length} label="Total Absences" />
						<Card
							number={totalUnjustified}
							label="Total unjustified absences "
						/>
						<Card number={mostAbsentCount} label="Courses with Absences" />
						<Card
							number={mostAbsentCourse ? mostAbsentCourse : "—"}
							label="Course with Most Absences"
						/>
					</div>
					<p className="p-8 mx-auto mt-4 text-2xl font-bold text-center max-w-prose">
						All absences
					</p>
					<div className="mt-4">
						<div className="overflow-x-auto rounded-lg shadow">
							<table className="min-w-full divide-y divide-gray-200">
								<thead>
									<tr className="bg-green-200 bg-opacity-25">
										<th className="px-4 py-2 text-sm font-semibold text-left text-green-900">
											DATE
										</th>

										<th className="px-4 py-2 text-sm font-semibold text-left text-green-900">
											COURSE
										</th>
										<th className="px-4 py-2 text-sm font-semibold text-left text-green-900">
											REASON
										</th>
									</tr>
								</thead>
								<tbody className="text-sm divide-y divide-gray-200">
									{studentAbsences.length > 0 ? (
										studentAbsences.map((absence, index) => (
											<tr
												key={`${absence.matricule}-${absence.date}-${index}`}
												className="hover:bg-gray-100"
											>
												<td className="p-3">{absence.date}</td>

												<td className="p-3">{absence.class_name}</td>
												<td className="p-3">
													{absence.reason ? absence.reason : "	—"}
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={5} className="p-4 text-center">
												No absences found
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div className="p-20"></div>
			<Footer />
		</div>
	);
};

export default SDashboard;
