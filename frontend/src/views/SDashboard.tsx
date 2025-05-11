import Sheader from "../components/Sheader";
import StudentCard from "../components/StudentCard";
import Card from "../components/Card";
import AbsencesTable from "../components/AbsencesTable";
import Footer from "../components/Footer";

const SDashboard = () => {
	return (
		<div>
			<Sheader />
			<div className="ml-80 mr-80 ">
				<div className=" pt-4 mt-20 pb-4">
					<p className="font-bold text-2xl text-center mx-auto max-w-prose p-8">
						Student Dashboard
					</p>

					<div className="flex flex-wrap gap-10">
						<StudentCard />
						<Card number="9" label="Total Absences" />
						<Card number="4" label="Total unjustified absences " />
						<Card number="3" label="Courses with Absences" />
						<Card number="Biology 101" label="Course with Most Absences" />
					</div>
					<p className="font-bold mt-4 text-2xl text-center mx-auto max-w-prose p-8">
						All absences
					</p>
					<div className="mt-4">
						<AbsencesTable />
					</div>
				</div>
			</div>
			<div className="p-20"></div>
			<Footer />
		</div>
	);
};

export default SDashboard;
