import absenceData from "../Absences.json";
interface AbsenceRecord {
	date: string;
	student: string;
	studentId: string;
	course: string;
	reason: string;
}
const AbsencesTable = () => {
	const absences: AbsenceRecord[] = absenceData.absences;
	return (
		<div>
			<div className=" overflow-x-auto rounded-lg shadow   ">
				<table className="min-w-full divide-y divide-gray-200  ">
					<thead>
						<tr className="bg-green-200 bg-opacity-25 ">
							<th className=" px-4 py-2 text-left text-sm text-green-900 font-semibold">
								DATE
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
	);
};

export default AbsencesTable;
