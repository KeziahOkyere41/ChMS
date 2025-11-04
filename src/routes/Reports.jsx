import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function Reports() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [donationData, setDonationData] = useState([]);
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");

    axios.get("http://127.0.0.1:8000/api/attendance/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setAttendanceData(res.data))
    .catch((err) => console.error("Attendance API Error:", err));

    axios.get("http://127.0.0.1:8000/api/giving/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setDonationData(res.data))
    .catch((err) => console.error("Giving API Error:", err));

    axios.get("http://127.0.0.1:8000/api/members/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const formatted = res.data.map((m) => ({
        date: m.date_joined?.split("T")[0] || "Unknown",
        count: 1,
      }));
      setMemberData(formatted);
    })
    .catch((err) => console.error("Members API Error:", err));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Reports & Analytics</h2>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-md font-medium mb-2">Attendance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" name="Members Present" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-md font-medium mb-2">Monthly Donations</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={donationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" name="Amount (GHS)" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-md font-medium mb-2">Membership Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={memberData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Members Joined" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}