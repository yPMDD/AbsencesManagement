import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalStudents from "../components/ModalStudents";
import { useState } from "react";

const Students = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<>
			<Header />
			<div className="p-4 ml-80 mr-80">
				<div className="flex gap-80">
					<div className=" pt-4 pb-4">
						<h1 className="text-2xl font-bold mb-2 ">Student Management</h1>
						<p className="mb-6">Manage and track all students</p>
					</div>
					<div className="flex gap-4 ml-60">
						<div className="relative mt-7">
							<div>
								<input
									placeholder="Search Student..."
									className="input  text-sm border border-gray-300 outline-none  focus:outline-green-600 px-4 py-3 rounded w-60 h-10 transition-colors duration-200  "
									name="search"
									type="search"
								/>
								<svg
									className="size-5 absolute top-3 right-3 text-gray-500"
									stroke="currentColor"
									stroke-width="1.5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
										stroke-linejoin="round"
										stroke-linecap="round"
									></path>
								</svg>
							</div>
						</div>
						<button
							onClick={() => setIsModalOpen(true)}
							popoverTarget="modal"
							className="bg-green-700 font-sans text-sm font-semibold text-white p-2 rounded w-40 h-10 mt-7 hover:bg-green-800 transition-colors duration-600"
						>
							Record New Student
						</button>
					</div>
				</div>
				<ModalStudents
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			</div>
			<Footer />
		</>
	);
};

export default Students;
