#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT_NAME="$(basename "$0")"
ENV_FILE="${ENV_FILE:-$ROOT_DIR/.env.local}"
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-3004}"

log() {
  printf '[ai-blog] %s\n' "$*"
}

die() {
  printf '[ai-blog] error: %s\n' "$*" >&2
  exit 1
}

usage() {
  cat <<EOF
Usage: $SCRIPT_NAME <prepare|start|run>

Commands:
  prepare  Install dependencies, generate Prisma client, push schema, seed, and build.
  start    Start the production Next.js server on HOST=${HOST} PORT=${PORT}.
  run      Run prepare, then start.

Environment overrides:
  ENV_FILE  Defaults to $ROOT_DIR/.env.local
  HOST      Defaults to 127.0.0.1
  PORT      Defaults to 3004
EOF
}

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"
}

load_env() {
  [ -f "$ENV_FILE" ] || die "Missing env file: $ENV_FILE. Copy .env.example to .env.local first."
  while IFS= read -r line || [ -n "$line" ]; do
    case "$line" in
      ""|\#*)
        continue
        ;;
    esac

    if [[ "$line" != *"="* ]]; then
      die "Invalid env line in $ENV_FILE: $line"
    fi

    local key="${line%%=*}"
    local value="${line#*=}"

    key="$(printf '%s' "$key" | sed 's/[[:space:]]*$//')"
    value="$(printf '%s' "$value" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//')"

    if [[ "$value" == \"*\" && "$value" == *\" ]]; then
      value="${value:1:${#value}-2}"
    elif [[ "$value" == \'*\' && "$value" == *\' ]]; then
      value="${value:1:${#value}-2}"
    fi

    export "$key=$value"
  done < "$ENV_FILE"
}

require_env() {
  local name="$1"
  [ -n "${!name:-}" ] || die "Missing required env var: $name"
}

warn_if_auth_incomplete() {
  if [ -z "${NEXT_PUBLIC_SUPABASE_URL:-}" ] || [ -z "${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}" ] || [ -z "${SUPABASE_SERVICE_ROLE_KEY:-}" ]; then
    log "Supabase auth vars are incomplete. Public pages will run, but admin magic-link login will fail."
  fi
}

validate_env() {
  require_env NEXT_PUBLIC_SITE_URL
  require_env ADMIN_EMAIL
  require_env ADMIN_FULL_NAME

  if [ "${AI_BLOG_DEMO_MODE:-0}" = "1" ]; then
    log "AI_BLOG_DEMO_MODE=1 detected. Skipping DATABASE_URL requirement."
  else
    require_env DATABASE_URL
  fi

  warn_if_auth_incomplete
}

list_listen_ports() {
  if command -v ss >/dev/null 2>&1; then
    ss -ltnH 2>/dev/null | awk '{print $4}' | awk -F: '{print $NF}'
    return
  fi

  if command -v netstat >/dev/null 2>&1; then
    netstat -ltn 2>/dev/null | awk 'NR > 2 {print $4}' | awk -F: '{print $NF}'
    return
  fi

  die "Neither ss nor netstat is available to verify the listen port."
}

ensure_port_free() {
  if list_listen_ports | grep -Fxq "$PORT"; then
    die "Port $PORT is already in use. This host already occupies 3000-3003, so 3004 is the intended default for ai.kevin-mok.com."
  fi
}

prepare() {
  need_cmd pnpm
  load_env
  validate_env

  cd "$ROOT_DIR"

  log "Installing dependencies"
  pnpm install --frozen-lockfile

  log "Generating Prisma client"
  pnpm prisma:generate

  if [ "${AI_BLOG_DEMO_MODE:-0}" = "1" ]; then
    log "Skipping database push and seed because AI_BLOG_DEMO_MODE=1."
  else
    log "Pushing Prisma schema"
    pnpm db:push

    log "Seeding admin profile"
    pnpm prisma:seed
  fi

  log "Building production bundle"
  pnpm build
}

start() {
  need_cmd pnpm
  load_env
  validate_env
  ensure_port_free

  cd "$ROOT_DIR"
  [ -f "$ROOT_DIR/.next/BUILD_ID" ] || die "Missing .next/BUILD_ID. Run '$SCRIPT_NAME prepare' first."

  log "Starting Next.js on ${HOST}:${PORT}"
  exec pnpm exec next start --hostname "$HOST" --port "$PORT"
}

run() {
  prepare
  start
}

case "${1:-}" in
  prepare)
    prepare
    ;;
  start)
    start
    ;;
  run)
    run
    ;;
  ""|-h|--help|help)
    usage
    ;;
  *)
    die "Unknown command: $1"
    ;;
esac
