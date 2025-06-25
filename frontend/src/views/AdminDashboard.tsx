import RecentAbcencesCard from "../components/RecentAbcencesCard.tsx";
// import BigCard from "../components/BigCard.tsx";
import Card from "../components/Card.tsx";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import ReportCard from "../components/ReportCard.tsx";
import StudentsCard from "../components/StudentsCard.tsx";
import RecordCard from "../components/RecordCard.tsx";
import TopAbsenceCourses from "../components/TopAbsenceCourses.tsx";
const Dashboard = () => {
	return (
		<div>
			<Header />
			<p className="p-8 mx-auto mt-20 text-2xl font-bold text-center max-w-prose">
				Administrator Dashboard
			</p>
			<div className="flex flex-wrap gap-10 p-4 mr-80 ml-80">
				<Card label="Total students" number="4" />
				<Card label="Total absences" number="7" />
				<Card label="Students with Absences" number="3" />
				<Card label="Absence Rate in school" number="41.24%" />
				{/* <BigCard /> */}
				<TopAbsenceCourses />
				<RecentAbcencesCard />
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
