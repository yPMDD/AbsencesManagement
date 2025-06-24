import Footer from "../components/Footer";
import Sheader from "../components/Sheader";

const SProfile = () => {
	const user = JSON.parse(localStorage.getItem("user") || "{}");

	return (
		<div>
			<Sheader />
			<div className="container px-4 py-8 mx-auto mt-20">
				<div className="pt-4 pb-4">
					<h1 className="mb-2 text-2xl font-bold">Profile Management</h1>
					<p className="mb-6">Modify and update profile</p>
				</div>
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					<div className="p-6 bg-white rounded-lg shadow-md">
						<h3 className="mb-4 text-xl font-semibold text-gray-800">
							Your Information
						</h3>
						<div className="space-y-4">
							<div>
								<p className="text-sm font-medium text-gray-500">Student ID</p>
								<p className="text-gray-800">{user.user.matricule}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">Name</p>
								<p className="text-gray-800">{user.user.full_name}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">Email</p>
								<p className="text-gray-800">{user.user.email}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">Program</p>
								<p className="text-gray-800">{user.user.major}</p>
							</div>
						</div>
					</div>

					<div className="p-6 bg-white rounded-lg shadow-md">
						<h3 className="mb-4 text-xl font-semibold text-gray-800">
							Change Password
						</h3>
						<form className="space-y-4">
							<div>
								<label
									for="new-password"
									className="block mb-1 text-sm font-medium text-gray-700"
								>
									New Password
								</label>
								<input
									type="password"
									id="new-password"
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
									placeholder="Enter new password"
								/>
							</div>
							<div>
								<label
									for="confirm-password"
									className="block mb-1 text-sm font-medium text-gray-700"
								>
									Confirm New Password
								</label>
								<input
									type="password"
									id="confirm-password"
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
									placeholder="Confirm new password"
								/>
							</div>
							<button
								type="submit"
								className="w-full px-4 py-2 text-white transition duration-200 bg-green-700 rounded rounded-md mt-7 hover:bg-green-800"
							>
								Update Password
							</button>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SProfile;
