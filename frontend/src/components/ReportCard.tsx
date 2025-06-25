import ReactModal from "react-modal";
import { useState } from "react";
import GenerateReportModal from "./GenerateReportModal";
const ReportCard = () => {
	const [isReportModalOpen, setIsReportModalOpen] = useState(false);

	return (
		<div
			onClick={() => setIsReportModalOpen(true)}
			className="flex cursor-pointer w-80 rounded bg-gray-100 p-6 shadow-md basis-[calc(31%-0px)] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg  "
		>
			<span className="font-semibold ">
				<svg
					className="rounded h-7"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g>
					<g id="SVGRepo_iconCarrier">
						{" "}
						<path
							d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M12 11H9M15 15H9"
							stroke="#578e60"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>{" "}
					</g>
				</svg>
			</span>
			<span className="pl-3 font-semibold ">Generate Reports</span>
			<ReactModal
				isOpen={isReportModalOpen}
				onRequestClose={() => setIsReportModalOpen(false)}
				ariaHideApp={false}
				className="bg-white border-none outline-none p-6 md:p-8 rounded-lg max-w-[500px] w-full mx-4 md:mx-auto shadow-xl transform transition-all duration-300 ease-out"
				overlayClassName="fixed border-none outline-none inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
				closeTimeoutMS={200}
			>
				<div className="relative">
					<GenerateReportModal closeModal={() => setIsReportModalOpen(false)} />
				</div>
			</ReactModal>
		</div>
	);
};

export default ReportCard;
