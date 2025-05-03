// src/components/Sidebar.jsx
export default function Sidebar() {
    return (
      <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">C2 Menu</h2>
        <ul className="space-y-4">
          <li className="hover:text-teal-400 cursor-pointer">Agents</li>
          <li className="hover:text-teal-400 cursor-pointer">Command Queue</li>
          <li className="hover:text-teal-400 cursor-pointer">Logs</li>
          <li className="hover:text-teal-400 cursor-pointer">Settings</li>
        </ul>
      </div>
    );
  }
  