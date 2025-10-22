import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"; 
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./index.css"; 
import Dashboard from "./Pages/Dashboard";
import InvitePage from "./Pages/Invite";
import ThanksLetter from "./Pages/Thanksletter";
import ManageAlumni from "./Pages/AlumniManage";
import AlumniDashboard from "./Pages/Alumnipage";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />        
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Dashboard />} />  
        <Route path="/student-dashboard" element={<AlumniDashboard />} />
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/thankyou" element={<ThanksLetter />} />
        <Route path="/manage" element={<ManageAlumni />} />
        <Route path="/alumni" element={<AlumniDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
