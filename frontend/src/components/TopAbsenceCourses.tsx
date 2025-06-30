const AbsenceBarChart = (props) => {
	const courses = props.props || [];

	// Sort courses by absences in descending order
	const sortedCourses = [...courses].sort((a, b) => b.absences - a.absences);

	// Find max absences for scaling
	const maxAbsences = sortedCourses[0]?.absences || 1;

	return (
		<div className="transition-all duration-300 hover:-translate-y-2 hover:shadow-lg w-80 rounded bg-gray-100 p-4 shadow-md basis-[calc(50%-20px)] ">
			<h3 className="text-xl font-semibold text-black-700">
				Courses with Most Absences
			</h3>
			<h5 className="mb-6 text-gray-500">Top courses by number of absences</h5>

			<div className="space-y-6">
				{sortedCourses.map((course) => (
					<div key={course.name} className="mb-6">
						<div className="flex items-center justify-between mb-2">
							<span className="font-medium text-gray-800">{course.name}</span>
							<span className="text-gray-600">
								{course.absences} absence{course.absences !== 1 ? "s" : ""}
							</span>
						</div>
						<div className="h-4 overflow-hidden bg-gray-200 rounded-full">
							<div
								className="h-full transition-all duration-300 bg-green-600 rounded-l-sm"
								style={{ width: `${(course.absences / maxAbsences) * 100}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AbsenceBarChart;
