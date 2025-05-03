from c2_server.api import app
import os

if __name__ == "__main__":
    safe_mode = os.getenv("C2_ENV", "safe")
    if safe_mode == "safe":
        print("🛡️ Running in SAFE mode. Agents restricted to localhost.")
    app.run(host="0.0.0.0", port=5000)
