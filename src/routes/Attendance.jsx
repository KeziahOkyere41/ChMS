import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Attendance() {
  const [members, setMembers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("access"); // Your JWT token
        const response = await axios.get("http://127.0.0.1:8000/api/members/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMembers(response.data);
      } catch (err) {
        setError("Failed to load members.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // ✅ Handle checkbox toggling
  const handleCheckboxChange = (memberId) => {
    setAttendance({
      ...attendance,
      [memberId]: !attendance[memberId],
    });
  };

  // ✅ Submit attendance
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        "http://127.0.0.1:8000/api/attendance/",
        {
          date: new Date().toISOString().split("T")[0],
          records: Object.entries(attendance).map(([memberId, isPresent]) => ({
            member: memberId,
            present: isPresent,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Attendance saved!");
    } catch (err) {
      alert("Failed to save attendance.");
    }
  };

  if (loading) return <p>Loading members...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Attendance</h2>
        <div className="text-sm text-slate-500">Take attendance for services and groups</div>
      </div>

      <div className="bg-white p-4 rounded">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-center">Present</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-t">
                <td className="p-2">{member.first_name} {member.last_name}</td>
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={attendance[member.id] || false}
                    onChange={() => handleCheckboxChange(member.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}