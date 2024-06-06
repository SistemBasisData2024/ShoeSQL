import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Import AuthContext
import "./App.css";
import LandingPage from "./LandingPage";
import Profile from "./Profile";
import Login from "./Login"; // Import Login
import Register from "./register";
import Dummy from "./dummy";
import InfoSepatu from "./InfoSepatu";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the whole app with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dummy" element={<Dummy />} />
          <Route path="/info/:id_sepatu" element={<InfoSepatu />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
