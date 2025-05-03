// src/components/CommandPanel.jsx
export default function CommandPanel() {
    return (
      <div className="bg-gray-800 text-white p-4 mt-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Command Execution</h2>
        <textarea
          className="w-full p-2 bg-gray-700 rounded text-sm text-white resize-none"
          rows="4"
          placeholder="Enter command to send to agent..."
        ></textarea>
        <button className="mt-3 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded text-white">
          Dispatch Command
        </button>
      </div>
    );
  }
  