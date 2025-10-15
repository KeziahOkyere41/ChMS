import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Shell from "./components/Shell";
import Dashboard from "./routes/Dashboard";
import Members from "./routes/Members";
import Attendance from "./routes/Attendance";
import Giving from "./routes/Giving";
import Events from "./routes/Events";
import Groups from "./routes/Groups";
import Reports from "./routes/Reports";
import Settings from "./routes/Settings";
import SignIn from "./routes/SignIn";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/signin" replace />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Shell>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/giving" element={<Giving />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/groups" element={<Groups />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Shell>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}