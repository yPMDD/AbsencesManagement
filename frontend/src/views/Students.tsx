import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalStudents from "../components/ModalStudents";
import { useState, useEffect } from "react";
import SearchIcon from "../ui/SearchIcon";
import { AuthService } from "../services/authService";
import DeleteButton from "../components/DeleteButton";

interface Student {
	id: number;
	matricule: string;
	full_name: string;
	email: string;
	major: string;
}

const Students = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [students, setStudents] = useState<Student[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const data = await AuthService.getStudents();
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
			<div className="p-4 ml-80 mt-20 mr-80">
				<div className="flex gap-80">
					<div className="pt-4 pb-4">
						<h1 className="text-2xl font-bold mb-2">Student Management</h1>
						<p className="mb-6">Manage and track all students</p>
					</div>
					<div className="flex gap-4 ml-60">
						<div className="relative mt-7">
							<div>
								<input
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Search Student..."
									className="input text-sm border border-gray-300 outline-none focus:outline-green-600 px-4 py-3 rounded w-60 h-10 transition-colors duration-200"
									name="search"
									type="search"
								/>
								<SearchIcon />
							</div>
						</div>
						<button
							onClick={() => setIsModalOpen(true)}
							popoverTarget="modal"
							className="bg-green-700 font-sans text-sm font-semibold text-white p-2 rounded w-40 h-10 mt-7 hover:bg-green-800 transition-colors duration-600"
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
								<th className="px-4 py-2 text-left text-sm text-green-900 font-semibold">
									Student ID
								</th>
								<th className="px-4 py-2 text-left text-sm text-green-900 font-semibold">
									Name
								</th>
								<th className="px-4 py-2 text-left text-sm text-green-900 font-semibold">
									Email
								</th>
								<th className="px-4 py-2 text-left text-sm text-green-900 font-semibold">
									Program
								</th>
								<th className="px-4 py-2 text-left text-sm text-green-900 font-semibold">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 text-sm">
							{isLoading ? (
								<tr>
									<td colSpan={5} className="text-center p-4">
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
												<button className="border bg-white hover:bg-green-100 border-green-600 border-opacity-40 text-green-600 font-medium py-[6px] px-4 rounded">
													View Absences
												</button>
												<DeleteButton
													studentId={student.id}
													studentName={student.full_name}
												/>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5} className="text-center p-4">
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
			<Footer />
		</>
	);
};

export default Students;
