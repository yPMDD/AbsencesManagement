import Header from "../components/Header";
import Footer from "../components/Footer";
import absenceData from "../Absences.json";
import Modal from "../components/Modal";
import { useState } from "react";

interface AbsenceRecord {
	date: string;
	student: string;
	studentId: string;
	course: string;
	reason: string;
}

const Absences = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const absences: AbsenceRecord[] = absenceData.absences;

	return (
		<>
			<Header />

			<div className="p-4 ml-80 mr-80">
				<div className="flex mt-20 gap-80">
					<div className=" pt-4 pb-4">
						<h1 className="text-2xl font-bold mb-2 ">Absence Management</h1>
						<p className="mb-6">Record and track student absences</p>
					</div>
					<div className="flex gap-4 ml-60">
						<div className="relative mt-7">
							<div>
								<input
									placeholder="Search Absences..."
									className="input  text-sm border border-gray-300 outline-none  focus:outline-green-600 px-4 py-3 rounded w-60 h-10 transition-colors duration-200  "
									name="search"
									type="search"
								/>
								<svg
									className="size-5 absolute top-3 right-3 text-gray-500"
									stroke="currentColor"
									stroke-width="1.5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
										stroke-linejoin="round"
										stroke-linecap="round"
									></path>
								</svg>
							</div>
						</div>
						<button
							onClick={() => setIsModalOpen(true)}
							popoverTarget="modal"
							className="bg-green-700 font-sans text-sm font-semibold text-white p-2 rounded w-40 h-10 mt-7 hover:bg-green-800 transition-colors duration-600"
						>
							Record New Absence
						</button>
					</div>
				</div>
				<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

				<div className=" overflow-x-auto rounded-lg shadow   ">
					<table className="min-w-full divide-y divide-gray-200  ">
						<thead>
							<tr className="bg-green-200 bg-opacity-25 ">
								<th className=" px-4 py-2 text-left text-sm text-green-900 font-semibold">
									DATE
								</th>
								<th className=" px-4 py-2 text-left text-sm text-green-900 font-semibold">
									STUDENT
								</th>
								<th className=" px-4 py-2 text-left text-sm text-green-900  font-semibold">
									STUDENT ID
								</th>
								<th className=" px-4 py-2 text-left text-sm text-green-900  font-semibold">
									COURSE
								</th>
								<th className=" px-4 py-2 text-left text-sm text-green-900  font-semibold">
									REASON
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 text-sm  ">
							{absences.map((absence) => (
								<tr className="hover:bg-gray-100">
									<td className="  p-3 ">{absence.date}</td>
									<td className="  p-3 font-semibold ">{absence.student}</td>
									<td className=" p-3 ">{absence.studentId}</td>
									<td className="  p-3  ">{absence.course}</td>
									<td className=" p-3 ">{absence.reason}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<p className="mt-4 text-sm text-gray-600">
					Showing {absences.length} of {absences.length} absences
				</p>
			</div>

			<div className="p-20"></div>
			<Footer />
		</>
	);
};

export default Absences;
