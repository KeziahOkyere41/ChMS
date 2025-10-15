import React from "react";
import StatCard from "../components/StatCard";
import { members, events, donations } from "../data/mock";

export default function Dashboard() {
  const totalMembers = members.length;
  const upcoming = events.filter((e) => new Date(e.date) >= new Date()).length;
  const totalDonations = donations.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Members" value={totalMembers} />
        <StatCard title="Upcoming Events" value={upcoming} />
        <StatCard
          title="Donations (GHS)"
          value={`GHS ${totalDonations.toFixed(2)}`}
        />
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 transition-colors duration-300">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Members Snapshot
          </h2>
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
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 transition-colors duration-300">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Upcoming Events
          </h3>
          <ul className="space-y-3">
            {events.map((e) => (
              <li
                key={e.id}
                className="text-sm flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-colors"
              >
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {e.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {e.date}
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {e.attendees}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}