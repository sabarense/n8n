#!/bin/bash
set -e

# Define source and destination
SOURCE_DIR="/home/node/app/dist/nodes/Random"
DEST_DIR="/home/node/.n8n/custom/Random"

# Ensure the destination directory exists and has the correct ownership
mkdir -p /home/node/.n8n/custom
chown -R node:node /home/node/.n8n

# As the node user, copy the built files to the volume
gosu node cp -r "$SOURCE_DIR" "$DEST_DIR"

# --- VALIDATION BLOCK ---
# Test if a key file from your custom node exists in the destination.
# Replace 'Random.node.js' with the actual name of your main node file.
if [ ! -f "$DEST_DIR/Random.node.js" ]; then
  # If the file doesn't exist, print an error and exit with a non-zero code.
  echo "FATAL: Custom node file 'Random.node.js' was not found in the destination." >&2
  echo "       The container will now exit." >&2
  exit 1
fi
# --- END VALIDATION BLOCK ---s

echo "✅ Custom node validation successful. Starting n8n..."

# Switch to the 'node' user and execute the main n8n command
exec gosu node "$@"
