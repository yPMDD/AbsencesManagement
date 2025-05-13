import "./App.css";
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
				<Route path="/ADashboard" element={<AdminDashboard />} />
				<Route path="/Students" element={<Students />} />
				<Route path="/" element={<Login />} />
				<Route path="/Absences" element={<Absences />} />
				<Route path="/SDashboard" element={<SDashboard />} />
				<Route path="/SProfile" element={<SProfile />} />
			</Routes>
		</Router>
	);
}

export default App;
