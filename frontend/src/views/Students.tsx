import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalStudents from "../components/ModalStudents";
import absenceData from "../studentAbsences.json";
import { useState } from "react";
import SearchIcon from "../ui/SearchIcon";

interface AbsenceRecord {
	id: string;
	studentName: string;
	date: string;
	className: string;
	email: string;
}

const Students = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const absences: AbsenceRecord[] = absenceData.absences;

	const allAbsences: AbsenceRecord[] = absenceData?.absences || [];
	const filteredAbsences = allAbsences.filter((absence) => {
		const searchText = searchTerm.toLowerCase();
		return (
			absence.studentName.toLowerCase().includes(searchText) ||
			absence.className.toLowerCase().includes(searchText)
		);
	});
	return (
		<>
			<Header />
			<div className="p-4 ml-80 mt-20 mr-80">
				<div className="flex gap-80">
					<div className=" pt-4 pb-4">
						<h1 className="text-2xl font-bold mb-2 ">Student Management</h1>
						<p className="mb-6">Manage and track all students</p>
					</div>
					<div className="flex gap-4 ml-60">
						<div className="relative mt-7">
							<div>
								<input
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Search Student..."
									className="input  text-sm border border-gray-300 outline-none  focus:outline-green-600 px-4 py-3 rounded w-60 h-10 transition-colors duration-200  "
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
				<div className=" overflow-x-auto rounded-lg shadow   ">
					<table className="min-w-full divide-y divide-gray-200  ">
						<thead>
							<tr className="bg-green-200 bg-opacity-25 ">
								<th className=" px-4 py-2 text-left text-sm text-green-900 font-semibold">
									Student ID
								</th>
								<th className=" px-4 py-2 text-left text-sm text-green-900 font-semibold">
									Name
								</th>

								<th className=" px-4 py-2 text-left text-sm text-green-900  font-semibold">
									Email
								</th>
								<th className=" px-4 py-2 text-left text-sm text-green-900  font-semibold">
									Program
								</th>
								<th className=" px-4 py-2 text-left text-sm text-green-900  font-semibold">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 text-sm  ">
							{filteredAbsences.length > 0 ? (
								filteredAbsences.map((absence) => (
									<tr key={`${absence.id}`} className="hover:bg-gray-100">
										<td className="  p-3 ">{absence.id}</td>
										<td className="  p-3 font-semibold ">
											{absence.studentName}
										</td>
										<td className="  p-3  ">{absence.email}</td>
										<td className=" p-3 ">{absence.className}</td>
										<td className=" p-3 ">
											<div className="flex space-x-4">
												<button className="border bg-white hover:bg-green-100 border-green-600 border-opacity-40 text-green-600 font-medium py-[6px] px-4 rounded">
													View Absences
												</button>
												<button className="border bg-white hover:bg-red-100 border-red-300 text-red-500 font-medium py-[6px] px-4 rounded">
													Delete
												</button>
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
					Showing {absences.length} of {absences.length} absences
				</p>
			</div>

			<Footer />
		</>
	);
};

export default Students;
