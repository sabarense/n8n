FROM node:22-bullseye-slim

# 1. Install gosu and n8n
RUN apt-get update && apt-get install -y gosu && \
    npm install -g n8n && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Set up the build directory
WORKDIR /home/node/app

# 3. Copy project files and build the custom node
COPY . .
RUN npm install && npm run build

# 4. Copy the entrypoint script and make it executable
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# 5. Set the entrypoint to our script and the default command to "n8n"
ENTRYPOINT ["entrypoint.sh"]
CMD ["n8n"]
