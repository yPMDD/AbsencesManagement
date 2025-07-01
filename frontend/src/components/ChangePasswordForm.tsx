// src/components/ChangePasswordForm.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { changePassword } from "../services/changePass";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons

type FormData = {
	new_password: string;
	confirm_password: string;
};

const ChangePasswordForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormData>();
	const [isLoading, setIsLoading] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const onSubmit = async (data: FormData) => {
		setIsLoading(true);
		try {
			await changePassword(data);
			toast.success("Password changed successfully!");
		} catch (error) {
			console.log(error);
			// toast.error(error.response?.data?.message || "Failed to change password");
		} finally {
			toast.success("Password changed successfully!");
			setIsLoading(false);
		}
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-4">
				<label
					htmlFor="new_password"
					className="block mb-1 text-sm font-medium text-gray-700"
				>
					New Password
				</label>
				<div className="relative">
					<input
						type={showNewPassword ? "text" : "password"}
						id="new_password"
						{...register("new_password", {
							required: "New password is required",
						})}
						className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
					<button
						type="button"
						className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
						onClick={() => setShowNewPassword(!showNewPassword)}
					>
						{showNewPassword ? <FaEyeSlash /> : <FaEye />}
					</button>
				</div>
				{errors.new_password && (
					<p className="mt-1 text-sm text-red-600">
						{errors.new_password.message}
					</p>
				)}
			</div>

			<div className="mb-6">
				<label
					htmlFor="confirm_password"
					className="block mb-1 text-sm font-medium text-gray-700"
				>
					Confirm Password
				</label>
				<div className="relative">
					<input
						type={showConfirmPassword ? "text" : "password"}
						id="confirm_password"
						{...register("confirm_password", {
							required: "Please confirm your password",
							validate: (value) =>
								value === watch("new_password") || "Passwords do not match",
						})}
						className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
					<button
						type="button"
						className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
					>
						{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
					</button>
				</div>
				{errors.confirm_password && (
					<p className="mt-1 text-sm text-red-600">
						{errors.confirm_password.message}
					</p>
				)}
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="w-full px-4 py-2 text-white bg-green-700 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoading ? "Changing..." : "Change Password"}
			</button>
		</form>
	);
};

export default ChangePasswordForm;
