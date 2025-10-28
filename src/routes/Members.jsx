import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get("http://127.0.0.1:8000/api/members/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    return <div className="text-center mt-10 text-gray-500">Loading members...</div>;

  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Members</h2>
        <div className="text-sm text-slate-500">{members.length} total</div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
        <table className="w-full table-auto text-left">
          <thead className="text-xs text-slate-500 dark:text-slate-400">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Role</th>
              <th className="p-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-t border-slate-200 dark:border-slate-700">
                <td className="p-2">{m.name}</td>
                <td className="p-2">{m.phone}</td>
                <td className="p-2">{m.role}</td>
                <td className="p-2">{m.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
