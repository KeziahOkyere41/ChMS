import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Giving() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await axios.get(
          "http://127.0.0.1:8000/api/giving/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDonations(response.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load donations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const total = donations.reduce((sum, d) => sum + Number(d.amount), 0);

  if (loading) return <p>Loading donations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Giving</h2>
        <div className="text-sm font-medium">Total GHS {total.toFixed(2)}</div>
      </div>

      <div className="bg-white p-4 rounded">
        {donations.length === 0 ? (
          <p className="text-sm text-slate-500">No donations found.</p>
        ) : (
          <ul className="space-y-2">
            {donations.map((d) => (
              <li
                key={d.id}
                className="flex items-center justify-between border p-2 rounded"
              >
                <div>
                  <div className="font-medium">{d.donor}</div>
                  <div className="text-xs text-slate-500">
                    {new Date(d.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="font-medium">GHS {Number(d.amount).toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}