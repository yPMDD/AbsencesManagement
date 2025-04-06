type CourseAbsence = {
	id: number;
	name: string;
	absenceCount: number;
	trend: "up" | "down" | "neutral";
	percentage: number;
};

type CourseAbsenceCardProps = {
	title?: string;
	data: CourseAbsence[];
	maxItems?: number;
};

const CourseAbsenceCard = ({ data, maxItems = 5 }: CourseAbsenceCardProps) => {
	// Sort and limit the data
	const sortedData = [...data]
		.sort((a, b) => b.absenceCount - a.absenceCount)
		.slice(0, maxItems);

	return (
		<div className="bg-white rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
			<div className="space-y-5">
				{sortedData.map((course) => (
					<div key={course.id} className="flex items-center justify-between">
						<div className="flex-1 min-w-0">
							<p className="text-l font-medium text-gray-700 truncate">
								{course.name}
							</p>
							<p className="text-xs text-gray-500">
								{course.absenceCount} absences
							</p>
						</div>

						<div className="flex items-center ml-4">
							<span
								className={`text-sm font-medium ${
									course.trend === "up"
										? "text-red-500"
										: course.trend === "down"
										? "text-green-500"
										: "text-gray-500"
								}`}
							>
								{course.trend === "up"
									? "↑"
									: course.trend === "down"
									? "↓"
									: "→"}
								{course.percentage}%
							</span>
						</div>
					</div>
				))}
			</div>

			{sortedData.length === 0 && (
				<p className="text-sm text-gray-500 text-center py-4">
					No absence data available
				</p>
			)}
		</div>
	);
};

export default CourseAbsenceCard;
