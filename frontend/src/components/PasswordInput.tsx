import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordInputProps {
	onPasswordChange: (password: string) => void;
	value: string;
}

const PasswordInput = ({ onPasswordChange, value }: PasswordInputProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const generateRandomPassword = () => {
		const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
		const numbers = "0123456789";
		const lowerCase = "abcdefghijklmnopqrstuvwxyz";
		const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		const allChars = specialChars + numbers + lowerCase + upperCase;
		const length = 12;

		let result = "";
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * allChars.length);
			result += allChars[randomIndex];
		}

		onPasswordChange(result);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onPasswordChange(e.target.value);
	};

	return (
		<div
			className={`border rounded flex p-2 ${
				isFocused ? "border-green-600" : "border-gray-300"
			}`}
		>
			<input
				value={value}
				type={showPassword ? "text" : "password"}
				name="password"
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={() => setIsFocused(false)}
				placeholder="Enter Student Password"
				className="p-2 outline-none text-sm border-none rounded border-gray-300 w-full"
			/>
			<button
				type="button"
				onClick={togglePasswordVisibility}
				className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
				aria-label={showPassword ? "Hide password" : "Show password"}
			>
				{showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
			</button>
			<button
				type="button"
				onClick={generateRandomPassword}
				className="bg-gray-200 border font-sans text-sm font-semibold p-2 rounded w-20 h-10 hover:bg-gray-400 transition-colors duration-300"
			>
				Generate
			</button>
		</div>
	);
};

export default PasswordInput;
