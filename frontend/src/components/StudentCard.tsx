// interface Student {
// 	id: number;
// 	matricule: string;
// 	full_name: string;
// 	email: string;
// 	major: string;
// }

const StudentCard = ({ student }) => {
	return (
		<div className="w-full px-8 py-6 transition-all duration-300 bg-gray-100 rounded shadow-md hover:-translate-y-2 hover:shadow-lg">
			<div className="flex items-start justify-between w-full gap-8 overflow-x-auto">
				{/* Title and subtitle block */}
				<div className="flex flex-col pr-6 min-w-max">
					<span className="text-2xl font-semibold text-green-700">
						Student Information
					</span>
					<p className="text-sm font-semibold">Your personal details</p>
				</div>

				{/* Student data blocks */}
				<div className="flex flex-wrap gap-10">
					<div className="min-w-[150px]">
						<span className="text-sm font-semibold">Student ID</span>
						<p className="text-sm font-semibold text-gray-500">
							{student.user.matricule}
						</p>
					</div>
					<div className="min-w-[150px]">
						<span className="text-sm font-semibold">Full name</span>
						<p className="text-sm font-semibold text-gray-500">
							{student.user.full_name}
						</p>
					</div>
					<div className="min-w-[200px]">
						<span className="text-sm font-semibold">Email</span>
						<p className="text-sm font-semibold text-gray-500">
							{student.user.email}
						</p>
					</div>
					<div className="min-w-[150px]">
						<span className="text-sm font-semibold">Program</span>
						<p className="text-sm font-semibold text-gray-500">
							{student.user.major}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentCard;
