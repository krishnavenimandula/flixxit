import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Main from "./components/Dashboard/Dashboard";

const App = () => {
  const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App
