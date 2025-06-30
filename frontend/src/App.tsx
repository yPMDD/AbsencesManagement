import "./App.css";
import { ToastContainer } from "react-toastify"; // 1. Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // 2. Import the CSS
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./views/AdminDashboard.tsx";
import Absences from "./views/Absences.tsx";
import Login from "./views/Login.tsx";
import SDashboard from "./views/SDashboard.tsx";
import Students from "./views/Students.tsx";
import SProfile from "./views/SProfile.tsx";

function App() {
	return (
		<Router>
			{/* 3. Add ToastContainer (best placed near the root) */}
			<ToastContainer
				position="top-left"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<Routes>
				<Route path="/" element={<Login />} />

				<Route element={<ProtectedRoute allowedRoles={["Staff"]} />}>
					<Route path="/ADashboard" element={<AdminDashboard />} />
					<Route path="/Students" element={<Students />} />
					<Route path="/Absences" element={<Absences />} />
				</Route>

				<Route element={<ProtectedRoute allowedRoles={["student"]} />}>
					<Route path="/SDashboard" element={<SDashboard />} />
					<Route path="/SProfile" element={<SProfile />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
