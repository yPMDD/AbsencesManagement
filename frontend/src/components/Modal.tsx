import { useState, useEffect } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const Modal = (props: ModalProps) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (props.isOpen) {
			setIsVisible(true);
			setTimeout(() => setIsAnimating(true), 10);
		} else {
			setIsAnimating(false);
			const timer = setTimeout(() => setIsVisible(false), 300); // match this to animation duration
			return () => clearTimeout(timer);
		}
	}, [props.isOpen]);

	if (!isVisible) return null;

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
				isAnimating ? "opacity-100" : "opacity-0"
			}`}
		>
			<div
				className="fixed inset-0 bg-black bg-opacity-80"
				onClick={props.onClose}
			/>
			<div
				className={`p-6 bg-white rounded-xl shadow w-[30rem] max-w-lg z-10 transition-all duration-300 ${
					isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
				}`}
			>
				<h2 className="font-semibold text-xl">Record New Absence</h2>
				<p className="mb-8 text-gray-500 opacity-70">
					Enter the details for student absence
				</p>
				<form action="#" method="POST" id="myForm">
					<label htmlFor="student" className="font-semibold">
						Student ID
					</label>
					<br />
					<input
						type="text"
						name="student"
						placeholder="Enter student ID"
						className="p-3 text-sm border rounded border-gray-200 w-full focus:outline-green-600 mb-2"
					/>
					<br />
					<label htmlFor="date" className="font-semibold">
						Date
					</label>
					<br />
					<input
						type="date"
						name="date"
						className="p-3 text-sm border rounded border-gray-300 w-full focus:outline-green-600 mb-2"
					/>
					<br />
					<label htmlFor="course" className="font-semibold">
						Course
					</label>
					<br />
					<input
						className="p-3 text-sm border rounded border-gray-300 w-full focus:outline-green-600 mb-2"
						type="text"
						name="course"
						placeholder="Enter course Name"
					/>
					<br />
					<label htmlFor="reason" className="font-semibold">
						Reason(Optional)
					</label>
					<br />
					<input
						type="text"
						name="reason"
						placeholder="Enter reason for absence"
						className="p-3 text-sm border rounded border-gray-300 w-full focus:outline-green-600 mb-2"
					/>
					<br />
				</form>
				<div className="flex justify-between mt-6">
					<button
						onClick={props.onClose}
						className="bg-white border font-sans text-sm font-semibold p-2 rounded w-20 h-10 hover:bg-gray-200 transition-colors duration-300"
					>
						Cancel
					</button>
					<button
						form="myForm"
						type="submit"
						className="bg-green-700 font-sans text-sm font-semibold text-white p-2 rounded w-40 h-10 hover:bg-green-800 transition-colors duration-300"
					>
						Record Absence
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
