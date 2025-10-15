import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  DollarSign,
  Layers,
  FileText,
  Settings,
  LogIn,
  LogOut,
} from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
  { to: "/members", label: "Members", icon: <Users size={18} /> },
  { to: "/attendance", label: "Attendance", icon: <Calendar size={18} /> },
  { to: "/giving", label: "Giving", icon: <DollarSign size={18} /> },
  { to: "/events", label: "Events", icon: <Layers size={18} /> },
  { to: "/reports", label: "Reports", icon: <FileText size={18} /> },
  { to: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

export default function Sidebar({ isCollapsed }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // remove stored login
    navigate("/signin");
  };

  return (
   <div
  className={`bg-white dark:bg-gray-800 border-r shadow-sm transition-all duration-300
    ${isCollapsed ? "w-16" : "w-64"}
    fixed md:relative inset-y-0 left-0 z-40 flex flex-col
    md:translate-x-0 ${isCollapsed ? "-translate-x-full" : "translate-x-0"}
    md:flex`}
>
      <div className="p-4 font-semibold text-lg text-indigo-600 dark:text-indigo-400">
        {isCollapsed ? "Ch" : "ChMS"}
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            title={link.label}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
              ${
                isActive
                  ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            {link.icon}
            {!isCollapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-700 p-3">
        <button
          onClick={() => navigate("/signin")}
          className="flex items-center gap-3 w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-4 py-2 text-sm font-medium"
        >
          <LogIn size={18} />
          {!isCollapsed && <span>Sign In</span>}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-md px-4 py-2 text-sm font-medium mt-1"
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}