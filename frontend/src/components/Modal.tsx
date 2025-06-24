import { useState, useEffect } from "react";
import { AuthService } from "../services/authService"; // Adjust import path as needed

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface AbsenceData {
	matricule: string;
	date: string;
	class_name: string;
	reason?: string; // Optional field
}

const Modal = (props: ModalProps) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [formData, setFormData] = useState<AbsenceData>({
		matricule: "",
		date: "",
		class_name: "",
		reason: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (props.isOpen) {
			setIsVisible(true);
			setTimeout(() => setIsAnimating(true), 10);
		} else {
			setIsAnimating(false);
			const timer = setTimeout(() => {
				setIsVisible(false);
				setError(null); // Reset error when closing
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [props.isOpen]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			console.log("Submitting absence data:", formData);
			await AuthService.registerAbsence(formData);
			props.onClose(); // Close modal on success
			// Reset form
			setFormData({
				matricule: "",
				date: "",
				class_name: "",
				reason: "",
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to record absence");
		} finally {
			setIsSubmitting(false);
		}
	};

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
				<h2 className="text-xl font-semibold">Record New Absence</h2>
				<p className="mb-8 text-gray-500 opacity-70">
					Enter the details for student absence
				</p>

				{error && (
					<div className="p-3 mb-4 text-sm text-red-600 bg-red-100 rounded-md">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<label htmlFor="matricule" className="font-semibold">
						Student ID
					</label>
					<input
						type="text"
						id="matricule"
						name="matricule"
						value={formData.matricule}
						onChange={handleChange}
						placeholder="Enter student ID"
						className="w-full p-3 mb-4 text-sm border border-gray-200 rounded focus:outline-green-600"
						required
					/>

					<label htmlFor="date" className="font-semibold">
						Date
					</label>
					<input
						type="date"
						id="date"
						name="date"
						value={formData.date}
						onChange={handleChange}
						className="w-full p-3 mb-4 text-sm border border-gray-300 rounded focus:outline-green-600"
						required
					/>

					<label htmlFor="class_name" className="font-semibold">
						Course
					</label>
					<input
						type="text"
						id="class_name"
						name="class_name"
						value={formData.class_name}
						onChange={handleChange}
						placeholder="Enter course Name"
						className="w-full p-3 mb-4 text-sm border border-gray-300 rounded focus:outline-green-600"
						required
					/>

					<label htmlFor="reason" className="font-semibold">
						Reason (Optional)
					</label>
					<input
						type="text"
						id="reason"
						name="reason"
						value={formData.reason || ""}
						onChange={handleChange}
						placeholder="Enter reason for absence"
						className="w-full p-3 mb-4 text-sm border border-gray-300 rounded focus:outline-green-600"
					/>

					<div className="flex justify-between mt-6">
						<button
							type="button"
							onClick={props.onClose}
							disabled={isSubmitting}
							className="w-20 h-10 p-2 font-sans text-sm font-semibold transition-colors duration-300 bg-white border rounded hover:bg-gray-200 disabled:opacity-50"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-40 h-10 p-2 font-sans text-sm font-semibold text-white transition-colors duration-300 bg-green-700 rounded hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? "Processing..." : "Record Absence"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Modal;
