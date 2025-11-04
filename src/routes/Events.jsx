import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get("http://127.0.0.1:8000/api/events/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Events</h2>
        <div className="text-sm text-slate-500">
          Manage upcoming events and volunteer lists
        </div>
      </div>

      <div className="bg-white p-4 rounded">
        {events.length === 0 ? (
          <p className="text-sm text-slate-500">No events available.</p>
        ) : (
          <ul className="space-y-2">
            {events.map((e) => (
              <li
                key={e.id}
                className="p-2 border rounded flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{e.title}</div>
                  <div className="text-xs text-slate-500">{e.date}</div>
                </div>
                <div className="text-xs text-slate-500">
                  {e.attendees || 0} attending
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}