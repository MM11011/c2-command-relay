#!/bin/bash

BASE_DIR="/Users/mmankoff/Projects/c2-command-relay"
PYTHON_ACTIVATE="source $BASE_DIR/venv/bin/activate"

# Kill any process on port 5000 (Flask)
PORT_5000_PID=$(lsof -ti tcp:5000)
if [ -n "$PORT_5000_PID" ]; then
    echo "⚠️ Port 5000 in use. Killing PID $PORT_5000_PID..."
    kill -9 $PORT_5000_PID
    sleep 1
fi

# Commands
MAIN_CMD="cd '$BASE_DIR'; $PYTHON_ACTIVATE; python main.py"
AGENT_CMD="cd '$BASE_DIR'; $PYTHON_ACTIVATE; python c2_server/agent_simulator.py"
WEB_UI_CMD="cd '$BASE_DIR/web_ui'; npm run dev"

# AppleScript: use existing window and launch in tabs
osascript <<EOF
tell application "Terminal"
    activate

    -- Tab 1: main.py
    tell application "System Events" to keystroke "t" using {command down}
    delay 0.4
    do script "$MAIN_CMD" in selected tab of front window

    -- Tab 2: agent_simulator.py
    tell application "System Events" to keystroke "t" using {command down}
    delay 0.4
    do script "$AGENT_CMD" in selected tab of front window

    -- Tab 3: web_ui
    tell application "System Events" to keystroke "t" using {command down}
    delay 0.4
    do script "$WEB_UI_CMD" in selected tab of front window
end tell
EOF

# Open browser
sleep 2
open "http://localhost:5173"

# Print terminal message
echo ""
echo "🖥️  All services launched in new tabs!"
echo "🌐 Visit your C2 Dashboard at: http://localhost:5173"
echo "⛔ To stop, use Ctrl+C in each tab or close the Terminal window."
