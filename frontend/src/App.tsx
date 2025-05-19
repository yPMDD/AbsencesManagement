import "./App.css";
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
