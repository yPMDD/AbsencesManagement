import RecentAbcencesCard from "../components/RecentAbcencesCard.tsx";
// import BigCard from "../components/BigCard.tsx";
import Card from "../components/Card.tsx";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import ReportCard from "../components/ReportCard.tsx";
import StudentsCard from "../components/StudentsCard.tsx";
import RecordCard from "../components/RecordCard.tsx";
import TopAbsenceCourses from "../components/TopAbsenceCourses.tsx";
import { useAbsencesData } from "../services/useAbsencesData";
import { toast } from "react-toastify";

const Dashboard = () => {
	const { data, loading, error } = useAbsencesData();
	if (loading) {
		return <div>Loading absence data...</div>;
	}
	if (error) {
		toast.error(error);
		return <div className="text-red-500">{error}</div>;
	}
	if (!data) {
		return <div>No data available</div>;
	}
	const topAbsences = data.top_courses.map((course) => ({
		name: course.class_name,
		absences: course.absence_count,
	}));
	const latest_absences = data.latest_absences.map((absence) => ({
		id: absence.matricule,
		studentName: absence.full_name,
		date: absence.date,
		reason: absence.reason,
		className: absence.class_name,
	}));
	console.log("Latest Absences Data:", latest_absences);
	console.log("Top Absences Data:", topAbsences);

	return (
		<div>
			<Header />
			<p className="p-8 mx-auto mt-20 text-2xl font-bold text-center max-w-prose">
				Administrator Dashboard
			</p>
			<div className="flex flex-wrap gap-10 p-4 mr-80 ml-80">
				<Card
					label="Total students"
					number={data.school_metrics.total_students}
				/>
				<Card
					label="Total absences"
					number={data.school_metrics.total_absences}
				/>
				<Card
					label="Students with Absences"
					number={data.school_metrics.students_with_absences}
				/>
				<Card
					label="Absence Rate in school per student"
					number={data.school_metrics.absence_rate}
				/>
				{/* <BigCard /> */}
				<TopAbsenceCourses props={topAbsences} />
				<RecentAbcencesCard props={latest_absences} />
			</div>
			<p className="p-8 mx-auto text-2xl font-bold text-center max-w-prose">
				Quick actions
			</p>
			<div className="flex flex-wrap gap-10 p-4 mr-80 ml-80">
				<StudentsCard />

				<RecordCard />
				<ReportCard />
			</div>
			<div className="p-20"></div>
			<Footer />
		</div>
	);
};

export default Dashboard;
