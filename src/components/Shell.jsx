import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DarkModeToggle from "./DarkModeToggle";

export default function Shell({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
  <Sidebar isCollapsed={isCollapsed} />
  <div className="flex-1 flex flex-col">
    <header className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-4 py-3">
      <h1 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
        Church Management
      </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
            >
              ☰
            </button>
    <DarkModeToggle />
            <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full font-medium">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
