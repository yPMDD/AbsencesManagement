import RecentAbcencesCard from "../components/RecentAbcencesCard.tsx";
import BigCard from "../components/BigCard.tsx";
import Card from "../components/Card.tsx";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import ReportCard from "../components/ReportCard.tsx";
import StudentsCard from "../components/StudentsCard.tsx";
import RecordCard from "../components/RecordCard.tsx";

const Dashboard = () => {
	return (
		<>
			<Header />
			<p className="font-bold text-2xl text-center mx-auto max-w-prose p-8">
				Administrator Dashboard
			</p>
			<div className=" flex flex-wrap gap-10 mr-80 ml-80 p-4 ">
				<Card label="Total students" number="279" />
				<Card label="Total absences" number="89" />
				<Card label="Students with Absences" number="60" />
				<Card label="Absence Rate in school" number="41.24%" />
				<BigCard />
				<RecentAbcencesCard />
			</div>
			<p className="font-bold text-2xl text-center mx-auto max-w-prose p-8">
				Quick actions
			</p>
			<div className=" flex flex-wrap gap-10 mr-80 ml-80 p-4 ">
				<StudentsCard />
				<RecordCard />
				<ReportCard />
			</div>
			<div className="p-20"></div>
			<Footer />
		</>
	);
};

export default Dashboard;
