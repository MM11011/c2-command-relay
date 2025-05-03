# C2 Command Relay – Secure Modular C2 Framework

**C2 Command Relay** is a modular and scalable Command-and-Control (C2) framework designed for red team operations and adversary emulation. It supports encrypted communications, agent management, dynamic payloads, and a fully dockerized local test lab.

> 🛡️ Built with commercial readiness in mind, but equipped with safety constraints to ensure ethical usage in controlled environments.

---

## 🔧 Features

- ✅ Modular command & payload system
- 🔐 Encrypted agent-server communications (AES + TLS)
- 🧱 Pluggable agent modules (e.g., keylogger, enum, screenshot)
- 📊 Web UI frontend for managing live sessions
- 🐳 Docker-based test lab with fake agents and isolated network
- 🧰 CLI control interface for red team operators
- ⚠️ **Default SAFE MODE restricts agent execution to localhost**

---

## 🚀 Getting Started

### 1. Clone and Setup Environment

```bash
git clone https://github.com/YOUR_USERNAME/c2-command-relay.git
cd c2-command-relay
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
