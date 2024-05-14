import "./ToDo/App.css";
import Todo from "./ToDo/Dashboard.jsx";
import Login from "./ToDo/Login.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./ToDo/Register.jsx";
import Profile from "./ToDo/Profile.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ToDo" element={<Todo />} />        
        <Route path="/" element={<Login />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
export const API_URL = "https://127.0.0.1:8000";