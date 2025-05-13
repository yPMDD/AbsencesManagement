import Footer from "../components/Footer";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons from react-icons
const Login = () => {
	const [isFocused, setIsFocused] = useState(false);
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	return (
		<>
			<div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
				<div className="w-full max-w-md">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<img
							alt="Emsi logo"
							src="../public/images/emsiLogo.png"
							className="mx-auto h-18 w-auto"
						/>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form action="#" method="POST" className="space-y-6">
							<div>
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
										className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:border-green-200 focus:outline-2 focus:-outline-offset-2 outline-none focus:ring-1 focus:ring-green-500 focus:outline-none sm:text-sm/6"
									>
										<option disabled selected>
											Choisir une ville
										</option>
										<option value="CB">CASABLANCA</option>
										<option value="RA">RABAT</option>
										<option value="MK">MARRAKECH</option>
										<option value="TA">TANGER</option>
										<option value="FS">FES</option>
									</select>
								</div>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm/6 font-medium text-gray-900"
								>
									Matricule
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										required
										autoComplete="email"
										className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:border-green-200 focus:outline-2 focus:-outline-offset-2 outline-none focus:ring-1 focus:ring-green-500 focus:outline-none sm:text-sm/6"
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
									<div className="text-sm"></div>
								</div>
								<div className="mt-2">
									<div
										className={`border rounded flex p-1 ${
											isFocused ? "border-green-600" : "border-gray-300"
										}`}
									>
										<input
											value={password}
											type={showPassword ? "text" : "password"}
											name="mdp"
											onChange={(e) => setPassword(e.target.value)}
											onFocus={handleFocus}
											onBlur={() => setIsFocused(false)}
											placeholder="Enter Student Password"
											className="p-2 outline-none text-sm border-none rounded border-gray-300 w-full"
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
									className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
								>
									Se connecter
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
