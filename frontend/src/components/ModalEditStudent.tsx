import { useState, useEffect } from "react";
import { AuthService } from "../services/authService";

interface Student {
	id: number;
	matricule: string;
	full_name: string;
	email: string;
	major: string;
	guardianEmail?: string;
	phone_number?: string;
	city?: string;
}

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	selectedStudent: Student | null;
	onStudentUpdated: (updatedStudent: Student) => void; // New callback prop
}

const Modal = (props: ModalProps) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	// Form state - initialize with selected student data
	const [formData, setFormData] = useState<Omit<Student, "id">>({
		matricule: "",
		full_name: "",
		email: "",
		major: "",
		guardianEmail: "",
		phone_number: "",
		city: "",
	});

	// Initialize form with selected student data
	useEffect(() => {
		if (props.selectedStudent) {
			setFormData({
				matricule: props.selectedStudent.matricule,
				full_name: props.selectedStudent.full_name,
				email: props.selectedStudent.email,
				major: props.selectedStudent.major,
				guardianEmail: props.selectedStudent.guardianEmail || "",
				phone_number: props.selectedStudent.phone_number || "",
				city: props.selectedStudent.city || "",
			});
		}
	}, [props.selectedStudent]);

	useEffect(() => {
		if (props.isOpen) {
			setIsVisible(true);
			setTimeout(() => setIsAnimating(true), 10);
		} else {
			setIsAnimating(false);
			const timer = setTimeout(() => {
				setIsVisible(false);
				setError(null);
				setSuccess(false);
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
		setError(null);
		setIsLoading(true);

		try {
			if (!props.selectedStudent) {
				throw new Error("No student selected");
			}

			// Call the update service
			const updatedStudent = await AuthService.updateStudent(
				props.selectedStudent.id,
				formData
			);

			setSuccess(true);
			props.onStudentUpdated(updatedStudent); // Notify parent of update

			// Close modal after 2 seconds
			setTimeout(() => {
				props.onClose();
			}, 2000);
		} catch (err) {
			console.error("Update error:", err);
			setError(err instanceof Error ? err.message : "Update failed");
		} finally {
			setIsLoading(false);
		}
	};

	if (!isVisible || !props.selectedStudent) return null;

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
				isAnimating ? "opacity-100" : "opacity-0"
			}`}
		>
			<div
				className="fixed inset-0 bg-black bg-opacity-50"
				onClick={props.onClose}
			/>
			<div
				className={`p-6 bg-white rounded-xl shadow w-[30rem] max-w-lg z-10 transition-all duration-300 ${
					isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
				}`}
			>
				<h2 className="text-xl font-semibold">
					Modify {props.selectedStudent.full_name} Details
				</h2>
				<p className="mb-8 text-gray-500 opacity-70">
					Edit details for an existing student
				</p>

				{error && (
					<div className="p-2 mb-4 text-red-700 bg-red-100 rounded">
						{error}
					</div>
				)}

				{success && (
					<div className="p-2 mb-4 text-green-700 bg-green-100 rounded">
						Student updated successfully!
					</div>
				)}

				<form onSubmit={handleSubmit} id="myForm">
					<label htmlFor="full_name" className="font-semibold">
						Full Name
					</label>
					<input
						type="text"
						name="full_name"
						className="w-full p-3 mb-2 text-sm border border-gray-200 rounded focus:outline-green-600"
						value={formData.full_name}
						onChange={handleChange}
						required
					/>

					<label htmlFor="email" className="font-semibold">
						Email
					</label>
					<input
						type="email"
						name="email"
						className="w-full p-3 mb-2 text-sm border border-gray-300 rounded focus:outline-green-600"
						value={formData.email}
						onChange={handleChange}
						required
					/>

					<label htmlFor="guardianEmail" className="font-semibold">
						Guardian's Email
					</label>
					<input
						type="email"
						name="guardianEmail"
						className="w-full p-3 mb-2 text-sm border border-gray-300 rounded focus:outline-green-600"
						value={formData.guardianEmail}
						onChange={handleChange}
					/>

					<label htmlFor="major" className="font-semibold">
						Major
					</label>
					<input
						type="text"
						name="major"
						className="w-full p-3 mb-2 text-sm border border-gray-300 rounded focus:outline-green-600"
						value={formData.major}
						onChange={handleChange}
					/>

					<label htmlFor="city" className="font-semibold">
						City
					</label>
					<input
						type="text"
						name="city"
						className="w-full p-3 mb-2 text-sm border border-gray-300 rounded focus:outline-green-600"
						value={formData.city}
						onChange={handleChange}
					/>

					<label htmlFor="phone_number" className="font-semibold">
						Phone Number
					</label>
					<input
						type="text"
						name="phone_number"
						className="w-full p-3 mb-2 text-sm border border-gray-300 rounded focus:outline-green-600"
						value={formData.phone_number}
						onChange={handleChange}
					/>
				</form>

				<div className="flex justify-between mt-6">
					<button
						onClick={props.onClose}
						className="w-20 h-10 p-2 font-sans text-sm font-semibold transition-colors duration-300 bg-white border rounded hover:bg-gray-200"
						disabled={isLoading}
					>
						Cancel
					</button>
					<button
						form="myForm"
						type="submit"
						className="w-40 h-10 p-2 font-sans text-sm font-semibold text-white transition-colors duration-300 bg-green-700 rounded hover:bg-green-800 disabled:opacity-50"
						disabled={isLoading}
					>
						{isLoading ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
