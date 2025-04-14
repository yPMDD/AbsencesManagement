import CourseAbsenceCard from "../components/CoursesAbsenceCard.tsx";

const BigCard = () => {
	const courseAbsenceData = [
		{
			id: 1,
			name: "Mathematics 101",
			absenceCount: 45,
			trend: "up",
			percentage: 12,
		},
		{
			id: 2,
			name: "History 201",
			absenceCount: 32,
			trend: "down",
			percentage: 8,
		},
		{
			id: 3,
			name: "Physics 301",
			absenceCount: 28,
			trend: "up",
			percentage: 15,
		},
		{
			id: 4,
			name: "Literature 105",
			absenceCount: 22,
			trend: "neutral",
			percentage: 0,
		},
		{
			id: 5,
			name: "Chemistry 205",
			absenceCount: 18,
			trend: "down",
			percentage: 5,
		},
	];
	return (
		<div className=" transition-all duration-300 hover:-translate-y-2 hover:shadow-lg w-80 rounded bg-gray-100 p-4 shadow-md basis-[calc(50%-20px)]">
			<span className=" text-xl font-semibold">Courses with Most Absences</span>
			<br></br>
			<span className=" text-gray-500">Top courses by number of absences</span>
			<br></br>
			<br></br>
			<CourseAbsenceCard data={courseAbsenceData} maxItems={5} />
		</div>
	);
};

export default BigCard;
