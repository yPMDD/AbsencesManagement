import { useNavigate } from "react-router-dom";
// import { AuthService } from '../services/authService'; // Adjust path as needed
import LogoutIcon from "../ui/LogoutIcon";
import useAuth from "../services/useAuth"; // If using your useAuth hook

const LogoutButton = () => {
	const navigate = useNavigate();
	const { logout } = useAuth(); // If using useAuth hook
	// OR
	// const handleLogout = async () => {
	//     await AuthService.logout();
	//     navigate('/login');
	// };

	const handleLogout = async () => {
		try {
			await logout(); // Using useAuth hook

			navigate("/"); // Redirect to login page
		} catch (error) {
			console.error("Logout failed:", error);
			// Optionally show error to user
		}
	};

	return (
		<button
			onClick={handleLogout}
			className="p-2 hover:bg-green-800 items-center justify-start w-8 h-8 rounded cursor-pointer"
			aria-label="Logout"
			title="Logout"
		>
			<LogoutIcon />
		</button>
	);
};

export default LogoutButton;
