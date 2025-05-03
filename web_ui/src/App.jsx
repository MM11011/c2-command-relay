import React, { useState, useEffect } from "react";
import "./App.css";
import AgentTags from "./AgentTags";

function App() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/agents")
      .then((res) => res.json())
      .then((data) => {
        setAgents(data);
        if (data.length > 0) {
          setSelectedAgent(data[0].agent_id);
        }
      });
  }, []);

  const handleDispatchCommand = async () => {
    if (!selectedAgent || !command) return;

    setLoading(true);
    setResponse(null); // clear prior response

    try {
      await fetch("http://localhost:5000/api/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agent_id: selectedAgent, command }),
      });

      let attempts = 0;
      let result = null;

      while (attempts < 10) {
        const res = await fetch(`http://localhost:5000/api/command-results/${selectedAgent}`);
        const data = await res.json();

        if (data.result) {
          result = data.result;
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        attempts++;
      }

      setTimeout(() => {
        setResponse(result || "No result received from agent.");
        setLoading(false);
      }, 300); // slight delay to show "Loading..."

    } catch (error) {
      console.error("❌ Error dispatching command:", error);
      setResponse("Error dispatching command.");
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Live C2 Agent Dashboard</h1>
      <h3>Red Team Ops</h3>

      <div className="agent-table">
        <div className="agent-row header">
          <div>Agent ID</div>
          <div>Hostname</div>
          <div>IP Address</div>
          <div>Status</div>
          <div>Last Check-In</div>
        </div>
        {agents.map((agent) => (
          <div
            key={agent.agent_id}
            className="agent-row"
            onClick={() => setSelectedAgent(agent.agent_id)}
            style={{
              backgroundColor: selectedAgent === agent.agent_id ? "#1e293b" : "inherit",
              cursor: "pointer",
            }}
          >
            <div>{agent.agent_id}</div>
            <div>{agent.hostname}</div>
            <div>{agent.ip_address}</div>
            <div style={{ color: "limegreen", fontWeight: "bold" }}>{agent.status}</div>
            <div>{agent.last_check_in}</div>
          </div>
        ))}
        <AgentTags tags={["Memory Dumping", "Active Beacon", "TTP: Discovery"]} />
      </div>

      <div className="command-section">
        <h3>Command Execution</h3>
        <textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command to send to agent..."
        />
        <button onClick={handleDispatchCommand}>Dispatch Command</button>
        {loading && <div className="response-output">Agent Response: <span className="pending">Loading results...</span></div>}
        {response && !loading && (
          <div className="response-output">
            <strong>Agent Response:</strong> {response}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
