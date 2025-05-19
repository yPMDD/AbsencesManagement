import Footer from "../components/Footer";
import { FiEye, FiEyeOff } from "react-icons/fi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService"; // Import your auth service
import { toast } from "react-toastify"; // For error notifications

const Login: React.FC = () => {
	const [isFocused, setIsFocused] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleFocus = () => setIsFocused(true);
	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// Authenticate with backend
			const response = await AuthService.login(
				formData.username, // Using matricule as username
				formData.password
			);
			console.log("user data:", response);
			// Redirect based on role
			if (response.user.role === "Staff") {
				console.log("Staff user logged in");
				navigate("/ADashboard");
			} else if (response.user.role === "student") {
				console.log("Student user logged in");
				navigate("/SDashboard");
			}

			toast.success("Login successful!");
		} catch (error) {
			toast.error("Login failed. Please check your credentials.");
			console.error("Login error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
				<div className="w-full max-w-md">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<img
							alt="Emsi logo"
							src="images/emsiLogo.png"
							className="mx-auto h-18 w-auto"
						/>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* <div>
								<label
									htmlFor="city"
									className="block text-sm/6 font-medium text-gray-900"
								>
									Ville
								</label>
								<div className="mt-2">
									<select
										name="city"
										id="city"
										value={formData.city}
										onChange={handleChange}
										required
										className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:border-green-200 focus:outline-2 focus:-outline-offset-2 outline-none focus:ring-1 focus:ring-green-500 focus:outline-none sm:text-sm/6"
									>
										<option value="" disabled>
											Choisir une ville
										</option>
										<option value="CB">CASABLANCA</option>
										<option value="RA">RABAT</option>
										<option value="MK">MARRAKECH</option>
										<option value="TA">TANGER</option>
										<option value="FS">FES</option>
									</select>
								</div>
							</div> */}

							<div>
								<label
									htmlFor="matricule"
									className="block text-sm/6 font-medium text-gray-900"
								>
									Matricule
								</label>
								<div className="mt-2">
									<input
										id="matricule"
										name="username"
										type="text"
										value={formData.username}
										onChange={handleChange}
										required
										className="block w-full  outline-none rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:border-green-600 focus:outline-2 focus:-outline-offset-2 outline-none focus:ring-1 focus:ring-green-500 focus:outline-none sm:text-sm/6"
									/>
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label
										htmlFor="password"
										className="block text-sm/6 font-medium text-gray-900"
									>
										Mot de passe
									</label>
								</div>
								<div className="mt-2">
									<div
										className={`border rounded flex p-1 ${
											isFocused ? "border-green-600" : "border-gray-300"
										}`}
									>
										<input
											value={formData.password}
											type={showPassword ? "text" : "password"}
											name="password"
											onChange={handleChange}
											onFocus={handleFocus}
											onBlur={() => setIsFocused(false)}
											required
											className="p-2 outline-none text-sm border-none rounded border-gray-300 w-full"
											placeholder="Enter your password"
										/>
										<button
											type="button"
											onClick={togglePasswordVisibility}
											className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
										>
											{showPassword ? (
												<FiEyeOff size={18} />
											) : (
												<FiEye size={18} />
											)}
										</button>
									</div>
								</div>
							</div>

							<div>
								<button
									type="submit"
									disabled={isLoading}
									className={`flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${
										isLoading ? "opacity-70 cursor-not-allowed" : ""
									}`}
								>
									{isLoading ? "Connexion en cours..." : "Se connecter"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Login;
