## ExecPlan: Production Server Run Script

### Objective

Add a production-oriented server script and matching documentation so this app can be prepared and run on `ai.kevin-mok.com` without colliding with existing Nginx-backed services on the host.

### Assumptions

1. This server already has Nginx terminating TLS and proxying local upstream ports.
2. Existing upstream allocations on this host already consume ports `3000` through `3003`, so this app should default to `127.0.0.1:3004`.
3. The requested deliverable is a repo-local script and documented run path, not direct modification of the host's live Nginx or systemd configuration from this repo.

### Plan

- Add a single shell script with `prepare`, `start`, and `run` commands for production setup and startup.
- Default the runtime port to `3004` and fail fast when the chosen port is already in use.
- Add package scripts that wrap the server script for easier use.
- Update `README.md` with the production flow for `ai.kevin-mok.com`, including the chosen upstream port and an Nginx example.

### Verification

- `bash -n scripts/ai-blog-server.sh`
- `ENV_FILE=/tmp/ai-blog-demo.env bash scripts/ai-blog-server.sh prepare`
- `ENV_FILE=/tmp/ai-blog-demo.env bash scripts/ai-blog-server.sh start`
- `curl -I --max-time 10 http://127.0.0.1:3004`

### Review

- Completed.
- Added `scripts/ai-blog-server.sh` with `prepare`, `start`, and `run` commands for production setup and startup.
- Defaulted the app runtime to `127.0.0.1:3004` because this host already uses `3000` through `3003` for other Nginx upstreams.
- Made the script fail fast when the requested listen port is already occupied.
- Switched env loading to dotenv-style parsing so values like `ADMIN_FULL_NAME="Kevin Mok"` work reliably.
- Added `pnpm start`, `pnpm server:prepare`, `pnpm server:start`, and `pnpm server:run` in `package.json`.
- Updated `README.md` with production steps for `ai.kevin-mok.com`, an Nginx upstream example, and the new server commands.
- Verified shell syntax, ran the full `prepare` path in demo mode, started the app successfully on `127.0.0.1:3004`, confirmed HTTP `200 OK`, and shut the temporary process back down.
