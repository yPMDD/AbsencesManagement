const StudentCard = () => {
	return (
		<div>
			<div className="flex gap-[399px] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg w-full rounded bg-gray-100 p-6 shadow-md basis-[calc(25%-30px)] ">
				<div>
					<span className=" text-2xl font-semibold text-green-700">
						Student Information
					</span>
					<p className="font-semibold  ">Your personal details</p>
				</div>
				<div className="flex gap-20">
					<div>
						<span className="font-semibold text-sm ">Student ID</span>
						<p className="font-semibold text-sm text-gray-500">$1001</p>
					</div>
					<div>
						<span className="font-semibold text-sm ">Full name</span>
						<p className="font-semibold text-sm text-gray-500">
							Alice Johnson{" "}
						</p>
					</div>
					<div>
						<span className="font-semibold text-sm ">Email</span>
						<p className="font-semibold text-sm text-gray-500">
							student@example.com
						</p>
					</div>
					<div>
						<span className="font-semibold text-sm ">Program</span>
						<p className="font-semibold text-sm text-gray-500">Biology</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentCard;
