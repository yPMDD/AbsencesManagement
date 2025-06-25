import { useState } from "react";
import { AuthService } from "../services/authService";
interface Props {
	closeModal: () => void;
}

interface AbsenceReportData {
	student_id?: string;
	course_id?: string;
	format: "pdf" | "xlsx";
}

const GenerateReportModal = ({ closeModal }: Props) => {
	const [reportType, setReportType] = useState("student");
	const [studentId, setStudentId] = useState("");
	const [courseId, setCourseId] = useState("");
	const [format, setFormat] = useState("pdf"); // or "excel"

	const handleGenerate = async () => {
		try {
			const reportParams: AbsenceReportData = {
				student_id: studentId,
				course_id: courseId,
				format: format,
			};
			const response = await AuthService.generateReport(reportParams);
			const blob = new Blob([response], {
				type:
					format === "pdf"
						? "application/pdf"
						: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `absence_report.${format === "pdf" ? "pdf" : "xlsx"}`;
			document.body.appendChild(link);
			link.click();
			link.remove();
			closeModal();
		} catch (error) {
			console.error("Error generating report:", error);
			alert("Failed to generate report.");
		}
	};

	// const handleGenerate = async () => {
	// 	try {
	// 		const response = await axios.post(
	// 			"/api/absences/report/",
	// 			{
	// 				student_id: studentId,
	// 				course_id: courseId,
	// 				format: format,
	// 			},
	// 			{ responseType: "blob" } // important for file download
	// 		);

	// 		const blob = new Blob([response.data], {
	// 			type:
	// 				format === "pdf"
	// 					? "application/pdf"
	// 					: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	// 		});

	// 		const url = window.URL.createObjectURL(blob);
	// 		const link = document.createElement("a");
	// 		link.href = url;
	// 		link.download = `absence_report.${format === "pdf" ? "pdf" : "xlsx"}`;
	// 		document.body.appendChild(link);
	// 		link.click();
	// 		link.remove();

	// 		closeModal();
	// 	} catch (error) {
	// 		console.error("Error generating report:", error);
	// 		alert("Failed to generate report.");
	// 	}
	// };

	// // const handleGenerate = (e: React.MouseEvent) => {
	// // 	e.preventDefault();
	// // 	console.log("Generating report with:", { reportType, studentId, format });
	// // 	closeModal();
	// // };

	const handleCancel = (e: React.MouseEvent) => {
		e.preventDefault();
		closeModal();
	};

	return (
		<div
			className="p-4 border-none outline-none"
			onClick={(e) => e.stopPropagation()}
		>
			<h2 className="mb-4 text-xl font-bold text-gray-800">
				Generate Absence Report
			</h2>

			<div className="space-y-4">
				<div>
					<label className="block mb-1 text-sm font-medium text-gray-700">
						Report Type:
					</label>
					<select
						value={reportType}
						onChange={(e) => setReportType(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded-md active:outline-none active:border-green-600 focus:border-green-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="student">By Student</option>
						<option value="course">By Course</option>
					</select>
				</div>

				<label className="block mb-1 text-sm font-medium text-gray-700">
					Student ID (optional):
				</label>
				<input
					type="text"
					value={studentId}
					onChange={(e) => setStudentId(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded-md active:outline-none active:border-green-600 focus:border-green-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				/>

				<label className="block mb-1 text-sm font-medium text-gray-700">
					Course ID (optional):
				</label>
				<input
					type="text"
					value={courseId}
					onChange={(e) => setCourseId(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded-md active:outline-none active:border-green-600 focus:border-green-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				/>

				<label className="block mb-1 text-sm font-medium text-gray-700">
					Report Format:
				</label>
				<select
					value={format}
					onChange={(e) => setFormat(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded-md active:outline-none active:border-green-600 focus:border-green-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				>
					<option value="pdf">PDF</option>
					<option value="excel">Excel</option>
				</select>
			</div>

			<div className="flex justify-end mt-6 space-x-3">
				<button
					onClick={handleCancel}
					className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md focus:ring-green-700 hover:bg-gray-200 focus:ring-blue-500"
				>
					Cancel
				</button>
				<button
					onClick={handleGenerate}
					className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
				>
					Generate
				</button>
			</div>
		</div>
	);
};

export default GenerateReportModal;
