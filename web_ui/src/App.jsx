import React, { useEffect, useState } from "react";

function App() {
  const [agents, setAgents] = useState([]);
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/agents")
      .then((res) => res.json())
      .then((data) => setAgents(data))
      .catch((err) => console.error("Error fetching agents:", err));
  }, []);

  const dispatchCommand = async () => {
    if (!command.trim()) return;

    const agentId = agents[0]?.agent_id; // For now: just sending to the first agent

    try {
      const res = await fetch("http://localhost:5000/api/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: agentId,
          command: command.trim(),
        }),
      });

      const data = await res.json();
      console.log("Dispatched command:", command);

      // Wait a few seconds for agent to execute (this should later be replaced by a better model)
      setTimeout(async () => {
        try {
          const resultRes = await fetch(`http://localhost:5000/api/command-results/${agentId}`);
          const resultData = await resultRes.json();
          setResponse(resultData.result || "No result received from agent.");
        } catch (err) {
          console.error("Error fetching command result:", err);
          setResponse("Error fetching result.");
        }
      }, 3000);
    } catch (err) {
      console.error("Error dispatching command:", err);
      setResponse("Error sending command.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 border-b border-gray-700 flex justify-between">
        <h1 className="text-2xl font-bold">Live C2 Agent Dashboard</h1>
        <span className="text-sm text-gray-400">Red Team Ops</span>
      </div>

      <div className="p-6">
        <table className="w-full table-auto text-sm text-left text-white">
          <thead className="bg-gray-700 uppercase text-xs text-gray-300">
            <tr>
              <th className="px-4 py-2">Agent ID</th>
              <th className="px-4 py-2">Hostname</th>
              <th className="px-4 py-2">IP Address</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Last Check-In</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.agent_id} className="bg-gray-800 border-b border-gray-700">
                <td className="px-4 py-2">{agent.agent_id}</td>
                <td className="px-4 py-2">{agent.hostname}</td>
                <td className="px-4 py-2">{agent.ip_address}</td>
                <td className="px-4 py-2 text-green-400">{agent.status}</td>
                <td className="px-4 py-2">{agent.last_check_in}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-gray-800 mt-4 rounded-lg mx-6">
        <h2 className="text-lg font-semibold mb-2">Command Execution</h2>
        <textarea
          className="w-full p-4 text-gray-300 bg-gray-700 rounded-md mb-4"
          rows="3"
          placeholder="Enter command to send to agent..."
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button
          onClick={dispatchCommand}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Dispatch Command
        </button>

        {response && (
          <div className="mt-4 p-4 bg-gray-700 rounded text-green-400 font-mono">
            <strong>Agent Response:</strong> {response}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
