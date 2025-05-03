// src/components/AgentTable.jsx
export default function AgentTable() {
    return (
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-gray-800 text-white rounded-md shadow-md">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="px-4 py-3">Agent ID</th>
              <th className="px-4 py-3">Hostname</th>
              <th className="px-4 py-3">IP Address</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Check-In</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700 hover:bg-gray-700">
              <td className="px-4 py-2">A01</td>
              <td className="px-4 py-2">test-host</td>
              <td className="px-4 py-2">10.0.0.5</td>
              <td className="px-4 py-2 text-green-400">Online</td>
              <td className="px-4 py-2">Just now</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  