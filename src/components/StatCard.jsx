import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 transition-colors duration-300">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mt-2">
        {value}
      </p>
    </div>
  );
}
