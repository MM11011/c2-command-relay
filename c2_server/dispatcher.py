import time
from collections import defaultdict

class AgentStore:
    def __init__(self):
        self.agents = {}
        self.command_queue = defaultdict(list)

    def register_or_update(self, agent_data):
        hostname = agent_data.get("hostname")
        ip = agent_data.get("ip")

        if not hostname or not ip:
            return False

        self.agents[hostname] = {
            "ip": ip,
            "status": agent_data.get("status", "unknown"),
            "last_seen": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        return True

    def get_all_agents(self):
        return self.agents

    def queue_command(self, hostname, command):
        self.command_queue[hostname].append(command)

    def get_next_command(self, hostname):
        if hostname in self.command_queue and self.command_queue[hostname]:
            return self.command_queue[hostname].pop(0)
        return None
