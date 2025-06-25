import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalStudents from "../components/ModalStudents";
import { useState, useEffect } from "react";
import SearchIcon from "../ui/SearchIcon";
import { AuthService } from "../services/authService";
import DeleteButton from "../components/DeleteButton";
import ReactModal from "react-modal";

interface Student {
	id: number;
	matricule: string;
	full_name: string;
	email: string;
	major: string;
}
interface AbsenceData {
	matricule: string;
	date: string;
	class_name: string;
	reason?: string;
	full_name?: string;
}

const Students = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [students, setStudents] = useState<Student[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
	const [studentAbsences, setStudentAbsences] = useState<AbsenceData[]>([]);
	const [isSModalOpen, setIsSModalOpen] = useState(false);
	const handleViewAbsences = async (student: Student) => {
		try {
			setSelectedStudent(student);
			const absences = await AuthService.getAbsencesByStudentId(student.id);
			console.log("Fetched absences for student:", absences);

			setStudentAbsences(absences.absences || []);
			setIsSModalOpen(true);
		} catch (error) {
			console.error("Failed to fetch absences", error);
		}
	};

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const data = await AuthService.getStudents();
				console.log("Fetched students:", data);
				setStudents(data);
			} catch (error) {
				console.error("Error fetching students:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStudents();
	}, []);

	const filteredStudents = students.filter((student) => {
		const searchText = searchTerm.toLowerCase();
		return (
			student.full_name.toLowerCase().includes(searchText) ||
			student.email.toLowerCase().includes(searchText) ||
			student.matricule.toLowerCase().includes(searchText) ||
			(student.major && student.major.toLowerCase().includes(searchText))
		);
	});

	return (
		<>
			<Header />
			<div className="p-4 mt-20 ml-80 mr-80">
				<div className="flex gap-80">
					<div className="pt-4 pb-4">
						<h1 className="mb-2 text-2xl font-bold">Student Management</h1>
						<p className="mb-6">Manage and track all students</p>
					</div>
					<div className="flex gap-4 ml-60">
						<div className="relative mt-7">
							<div>
								<input
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Search Student..."
									className="h-10 px-4 py-3 text-sm transition-colors duration-200 border border-gray-300 rounded outline-none input focus:outline-green-600 w-60"
									name="search"
									type="search"
								/>
								<SearchIcon />
							</div>
						</div>
						<button
							onClick={() => setIsModalOpen(true)}
							popoverTarget="modal"
							className="w-40 h-10 p-2 font-sans text-sm font-semibold text-white transition-colors bg-green-700 rounded mt-7 hover:bg-green-800 duration-600"
						>
							Record New Student
						</button>
					</div>
				</div>

				<ModalStudents
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>

				<div className="overflow-x-auto rounded-lg shadow">
					<table className="min-w-full divide-y divide-gray-200">
						<thead>
							<tr className="bg-green-200 bg-opacity-25">
								<th className="px-4 py-2 text-sm font-semibold text-left text-green-900">
									Student ID
								</th>
								<th className="px-4 py-2 text-sm font-semibold text-left text-green-900">
									Name
								</th>
								<th className="px-4 py-2 text-sm font-semibold text-left text-green-900">
									Email
								</th>
								<th className="px-4 py-2 text-sm font-semibold text-left text-green-900">
									Program
								</th>
								<th className="px-4 py-2 text-sm font-semibold text-left text-green-900">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="text-sm divide-y divide-gray-200">
							{isLoading ? (
								<tr>
									<td colSpan={5} className="p-4 text-center">
										Loading students...
									</td>
								</tr>
							) : filteredStudents.length > 0 ? (
								filteredStudents.map((student) => (
									<tr key={student.id} className="hover:bg-gray-100">
										<td className="p-3">{student.matricule}</td>
										<td className="p-3 font-semibold">{student.full_name}</td>
										<td className="p-3">{student.email}</td>
										<td className="p-3">{student.major || "-"}</td>
										<td className="p-3">
											<div className="flex space-x-4">
												<button
													onClick={() => handleViewAbsences(student)}
													className="border bg-white hover:bg-green-100 border-green-600 border-opacity-40 text-green-600 font-medium py-[6px] px-4 rounded"
												>
													View Absences
												</button>
												<DeleteButton
													studentId={student.id}
													studentName={student.full_name}
												/>
												<button className="border bg-white hover:bg-yellow-100 border-yellow-600 border-opacity-40 text-yellow-600 font-medium py-[6px] px-4 rounded">
													Edit
												</button>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5} className="p-4 text-center">
										No students found matching "{searchTerm}"
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				<p className="mt-4 text-sm text-gray-600">
					Showing {filteredStudents.length} of {students.length} students
				</p>
			</div>
			<ReactModal
				isOpen={isSModalOpen}
				onRequestClose={() => setIsSModalOpen(false)}
				className="relative w-11/12 max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg outline-none"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
				contentLabel={`Absences for ${selectedStudent?.full_name}`}
			>
				<div className="p-4">
					<div className="flex items-center justify-between mb-4">
						<div className="pb-3">
							<h2 className="text-xl font-bold">
								Absences for {selectedStudent?.full_name}
							</h2>
							<p className="text-gray-500">count : {studentAbsences.length}</p>
						</div>
					</div>

					{studentAbsences.length === 0 ? (
						<p className="text-gray-500">No absences found.</p>
					) : (
						<ul className="text-sm divide-y divide-gray-200">
							{studentAbsences.map((absence) => (
								<li key={absence.matricule} className="py-2">
									<p>
										<strong>Date:</strong> {absence.date}
									</p>
									<p>
										<strong>Course:</strong> {absence.class_name}
									</p>
									<p>
										<strong>Reason:</strong> {absence.reason || "N/A"}
									</p>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="flex justify-end">
					<button
						onClick={() => setIsSModalOpen(false)}
						className="w-20 h-10 p-2 font-sans text-sm font-semibold transition-colors duration-300 bg-gray-200 border rounded hover:bg-white disabled:opacity-50"
					>
						Close
					</button>
				</div>
			</ReactModal>
			<Footer />
		</>
	);
};

export default Students;
