import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import SearchIcon from "../ui/SearchIcon";
import { useEffect, useState } from "react";
import { AuthService } from "../services/authService";

interface AbsenceRecord {
	class_name: string;
	date: string;
	full_name: string;
	matricule: string;
	reason: string;
}

const Absences = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [absences, setAbsences] = useState<AbsenceRecord[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAbsences = async () => {
			try {
				const response = await AuthService.getAbsences();
				console.log("Fetched absences:", response);
				setAbsences(response.absences || []);
			} catch (err) {
				console.error("Error fetching absences:", err);
				setAbsences([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAbsences();
	}, []);

	const filteredAbsences = absences.filter((absence) => {
		const searchText = searchTerm.toLowerCase();
		return (
			absence.full_name.toLowerCase().includes(searchText) ||
			absence.matricule.toLowerCase().includes(searchText) ||
			absence.class_name.toLowerCase().includes(searchText) ||
			absence.reason.toLowerCase().includes(searchText)
		);
	});

	if (isLoading) {
		return (
			<>
				<Header />
				<div className="p-4 mt-20 text-center ml-80 mr-80">
					Loading absences...
				</div>
				<Footer />
			</>
		);
	}

	return (
		<>
			<Header />

			<div className="p-4 ml-80 mr-80">
				<div className="flex mt-20 gap-80">
					<div className="pt-4 pb-4">
						<h1 className="mb-2 text-2xl font-bold">Absence Management</h1>
						<p className="mb-6">Record and track student absences</p>
					</div>
					<div className="flex gap-4 ml-60">
						<div className="relative mt-7">
							<div className="relative">
								<input
									type="text"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Search Absences..."
									className="h-10 pl-3 text-sm transition-colors duration-200 border border-gray-300 rounded outline-none input focus:outline-green-600 w-60"
								/>
								<SearchIcon />
							</div>
						</div>
						<button
							onClick={() => setIsModalOpen(true)}
							className="w-40 h-10 p-2 font-sans text-sm font-semibold text-white transition-colors duration-300 bg-green-700 rounded mt-7 hover:bg-green-800"
						>
							Record New Absence
						</button>
					</div>
				</div>
				<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

				<div className="overflow-x-auto rounded-lg shadow">
					<table className="min-w-full divide-y divide-gray-200">
						<thead>
							<tr className="bg-green-200 bg-opacity-25">
								<th className="px-4 py-2 text-sm font-semibold text-left text-green-900">
									DATE
								</th>
								<th className="px-4 py-2 text-sm font-semibold text-left text-green-900">
									STUDENT
								</th>
								<th className="px-4 py-2 text-sm font-semibold text-left text-green-900">
									STUDENT ID
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
							{filteredAbsences.length > 0 ? (
								filteredAbsences.map((absence, index) => (
									<tr
										key={`${absence.matricule}-${absence.date}-${index}`}
										className="hover:bg-gray-100"
									>
										<td className="p-3">{absence.date}</td>
										<td className="p-3 font-semibold">{absence.full_name}</td>
										<td className="p-3">{absence.matricule}</td>
										<td className="p-3">{absence.class_name}</td>
										<td className="p-3">
											{absence.reason ? absence.reason : "	—"}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5} className="p-4 text-center">
										No absences found matching "{searchTerm}"
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				<p className="mt-4 text-sm text-gray-600">
					Showing {filteredAbsences.length} of {absences.length} absences
				</p>
			</div>

			<div className="p-20"></div>
			<Footer />
		</>
	);
};

export default Absences;
