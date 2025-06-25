import absencesData from "../studentAbsences.json";

const BigCard = () => {
	return (
		<div className=" transition-all duration-300 hover:-translate-y-2 hover:shadow-lg w-80 rounded bg-gray-100 p-4 shadow-md basis-[calc(50%-20px)]">
			<span className="text-xl font-semibold ">Recent absences</span>
			<br></br>
			<span className="text-gray-500 ">Latest recorded absences</span>
			<br></br>
			<br></br>
			<div className="space-y-4">
				{absencesData.absences.map((absence) => (
					<div
						key={absence.id}
						className="pb-4 border-b border-gray-200 last:border-0 last:pb-0"
					>
						<div className="flex items-start justify-between">
							<div>
								<h3 className="font-medium text-gray-900">
									{absence.studentName}
								</h3>
								<p className="text-sm text-gray-500">{absence.date}</p>
							</div>
							<span className="mt-2 text-sm text-gray-600">
								{absence.reason}
							</span>
							<span className="px-2 py-1 text-xs text-green-900 bg-green-100 rounded">
								{absence.className}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BigCard;
