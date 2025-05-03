# Command Relay C2 Framework

**Command Relay** is a modular Command and Control (C2) framework designed for red team operations, security research, and controlled threat emulation. It is built with secure architecture, Dockerized environments, agent-server encrypted communication, and a pluggable module system.

> ⚠️ This tool is intended for lawful, ethical use in controlled environments only.

---

## 🚀 Features

- 🔐 Encrypted agent-to-server communications
- 📡 Real-time agent heartbeat and registration
- 📥 Command queueing and remote execution simulation
- 🧩 Modular payload system (`enum_system`, `keylogger`, `screenshot`, etc.)
- 🐳 Docker-based test lab with safe-mode by default
- 🧪 Unit tests for all modules and server routes
- 🌐 React-based operator dashboard (in progress)

---

## 🧱 Architecture

```
agent (Docker container) ──▶ Flask C2 Server ──▶ In-memory AgentStore
        ▲                                  ▲
        └───── Polls for Commands ◀────────┘
```

See `/docs/architecture.md` and `/docs/deployment.md` for details.

---

## 📦 Installation & Usage

```bash
git clone https://github.com/YOUR_USERNAME/c2-command-relay
cd c2-command-relay
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd envs/test_lab
docker-compose up --build
```

---

## 🔧 API Endpoints

| Method | Route                 | Description                       |
|--------|----------------------|-----------------------------------|
| POST   | `/agent/heartbeat`   | Agent heartbeat and registration  |
| POST   | `/agent/next`        | Agent polls for next command      |
| GET    | `/agents`            | List all known agents             |
| POST   | `/command/queue`     | Queue a command for an agent      |

---

## 🌐 Frontend (Coming Soon)

A real-time React-based dashboard is under development to:
- View live agents
- Dispatch commands via UI
- Monitor logs and results

---

## 🛡️ Legal & Ethical Use

This project is for **educational, testing, and red team lab use only**. You are responsible for ensuring compliance with applicable laws and regulations. All unsafe behaviors are restricted by default in the provided test lab.

See `SECURITY.md` for disclosure policy and boundaries.

---

## 📄 License

MIT License — see `LICENSE` for details.
