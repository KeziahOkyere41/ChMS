import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get("http://127.0.0.1:8000/api/members/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMembers(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load members. Please check your connection or token.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading dashboard...</div>;

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  const totalMembers = members.length;

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Members" value={totalMembers} />
      </div>

      {/* Members Snapshot */}
      <section className="grid grid-cols-1 gap-8">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 transition-colors duration-300">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Recent Members
          </h2>
          {members.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No members found.</p>
          ) : (
            <ul className="space-y-3">
              {members.slice(0, 5).map((m) => (
                <li
                  key={m.id}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between bg-gray-50 dark:bg-gray-900 transition-colors"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {m.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {m.role} • {m.phone}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Joined {m.joined}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}