# Security Policy

## 🧭 Scope

This project, **Command Relay C2**, is designed strictly for:
- Red team simulations in controlled lab environments
- Educational and research purposes
- Secure software design exploration

It is **not intended for use on production systems, public-facing environments, or unauthorized targets**.

---

## 🔐 Security Best Practices Followed

- `.gitignore` excludes `.env`, tokens, credentials, Docker config, and local state
- No hardcoded secrets or tokens are committed
- Agents run in Docker containers restricted to internal Docker networks
- Safe-mode by default limits agent callback to localhost-only
- Minimal permissions used in containers and Python packages

---

## 📣 Reporting Security Issues

If you find a vulnerability in this project that could affect users, please disclose it responsibly.

### How to Report:
1. Email: `security@yourdomain.com`
2. Provide:
   - A description of the issue
   - Steps to reproduce
   - Suggested mitigation if known

We aim to respond within **3 business days**.

---

## 🤖 Responsible Use Expectations

Anyone who clones, forks, or modifies this repository agrees to:
- Use it only in systems you own or have explicit permission to test
- Never use this tool to exfiltrate, disrupt, or compromise unauthorized systems
- Comply with all local, state, and international laws

---

## 📄 License

This project is licensed under the MIT License. You are free to use, study, and modify it — but **misuse voids any implied license or support**.

Stay ethical. Stay secure. Stay curious.
