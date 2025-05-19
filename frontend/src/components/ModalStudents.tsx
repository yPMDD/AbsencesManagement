// Modal.tsx
import { useState, useEffect } from "react";
import PasswordInput from "./PasswordInput";
import { AuthService } from "../services/authService"; // Adjust the import path as needed

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const Modal = (props: ModalProps) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	// Form state
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		first_name: "",
		last_name: "",
		password: "",
		city: "",
		phone_number: "",
		matricule: "",
		major: "",
	});

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
				// Reset form when closing
				setFormData({
					username: "",
					email: "",
					first_name: "",
					last_name: "",
					password: "",
					city: "",
					phone_number: "",
					matricule: "",
					major: "",
				});
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

	const handlePasswordChange = (password: string) => {
		setFormData((prev) => ({
			...prev,
			password,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			// Split full name into first and last name
			const nameParts = formData.first_name.trim().split(" ");
			const firstName = nameParts[0];
			const lastName = nameParts.slice(1).join(" ") || " "; // Fallback to space if no last name

			const registrationData = {
				...formData,
				first_name: firstName,
				last_name: lastName,
				username: formData.email, // Using email as username
			};

			await AuthService.registerStudent(registrationData);
			setSuccess(true);
			// Close modal after 2 seconds
			setTimeout(() => {
				props.onClose();
			}, 2000);
		} catch (err) {
			console.error("Registration error:", err);
			setError(err instanceof Error ? err.message : "Registration failed");
		} finally {
			setIsLoading(false);
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
				<h2 className="font-semibold text-xl">Record New Student</h2>
				<p className="mb-8 text-gray-500 opacity-70">
					Enter the details for the new student
				</p>

				{error && (
					<div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
						{error}
					</div>
				)}

				{success && (
					<div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
						Student registered successfully!
					</div>
				)}

				<form onSubmit={handleSubmit} id="myForm">
					<label htmlFor="first_name" className="font-semibold">
						Full Name
					</label>
					<br />
					<input
						type="text"
						name="first_name"
						placeholder="Enter Student full name"
						className="p-3 text-sm border rounded border-gray-200 w-full focus:outline-green-600 mb-2"
						value={formData.first_name}
						onChange={handleChange}
						required
					/>
					<br />
					<label htmlFor="email" className="font-semibold">
						Email
					</label>
					<br />
					<input
						type="email"
						name="email"
						placeholder="Enter Student Email"
						className="p-3 text-sm border rounded border-gray-300 w-full focus:outline-green-600 mb-2"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<br />
					<label htmlFor="matricule" className="font-semibold">
						Student ID (Matricule)
					</label>
					<br />
					<input
						className="p-3 text-sm border rounded border-gray-300 w-full focus:outline-green-600 mb-2"
						type="text"
						name="matricule"
						placeholder="Enter Student ID"
						value={formData.matricule}
						onChange={handleChange}
						required
					/>
					<br />
					<label htmlFor="major" className="font-semibold">
						Major
					</label>
					<br />
					<input
						type="text"
						name="major"
						placeholder="Enter Student Major"
						className="p-3 text-sm border rounded border-gray-300 w-full focus:outline-green-600 mb-2"
						value={formData.major}
						onChange={handleChange}
					/>
					<br />
					<label htmlFor="city" className="font-semibold">
						City
					</label>
					<br />
					<input
						type="text"
						name="city"
						placeholder="Enter City"
						className="p-3 text-sm border rounded border-gray-300 w-full focus:outline-green-600 mb-2"
						value={formData.city}
						onChange={handleChange}
					/>
					<br />
					<label htmlFor="phone_number" className="font-semibold">
						Phone Number
					</label>
					<br />
					<input
						type="text"
						name="phone_number"
						placeholder="Enter Phone Number"
						className="p-3 text-sm border rounded border-gray-300 w-full focus:outline-green-600 mb-2"
						value={formData.phone_number}
						onChange={handleChange}
					/>
					<br />
					<label htmlFor="password" className="font-semibold">
						Password
					</label>
					<br />
					<PasswordInput
						onPasswordChange={handlePasswordChange}
						value={formData.password}
					/>
					<br />
				</form>
				<div className="flex justify-between mt-6">
					<button
						onClick={props.onClose}
						className="bg-white border font-sans text-sm font-semibold p-2 rounded w-20 h-10 hover:bg-gray-200 transition-colors duration-300"
						disabled={isLoading}
					>
						Cancel
					</button>
					<button
						form="myForm"
						type="submit"
						className="bg-green-700 font-sans text-sm font-semibold text-white p-2 rounded w-40 h-10 hover:bg-green-800 transition-colors duration-300 disabled:opacity-50"
						disabled={isLoading}
					>
						{isLoading ? "Registering..." : "Record new Student"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
