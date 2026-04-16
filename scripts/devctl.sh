#!/usr/bin/env bash
# Usage: scripts/devctl.sh <front|back|app> <start|stop|restart|status>
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUN_DIR="${ROOT}/.run"
mkdir -p "${RUN_DIR}"

BACK_PID="${RUN_DIR}/api.pid"
BACK_LOG="${RUN_DIR}/api.log"
FRONT_PID="${RUN_DIR}/web.pid"
FRONT_LOG="${RUN_DIR}/web.log"

is_running() {
  local pid_file="$1"
  [[ -f "${pid_file}" ]] || return 1
  local pid
  pid="$(tr -d ' \n\r' <"${pid_file}" || true)"
  [[ -n "${pid}" ]] || return 1
  kill -0 "${pid}" 2>/dev/null
}

stop_one() {
  local name="$1"
  local pid_file="$2"
  if [[ ! -f "${pid_file}" ]]; then
    echo "${name}: pas de PID (.run/$(basename "${pid_file}")) — déjà arrêté ?"
    return 0
  fi
  local pid
  pid="$(tr -d ' \n\r' <"${pid_file}" || true)"
  [[ -n "${pid}" ]] || { rm -f "${pid_file}"; echo "${name}: PID vide — fichier nettoyé."; return 0; }
  if kill -0 "${pid}" 2>/dev/null; then
    echo "${name}: arrêt du processus ${pid}…"
    kill "${pid}" 2>/dev/null || true
    sleep 1
    if kill -0 "${pid}" 2>/dev/null; then
      echo "${name}: envoi SIGKILL…"
      kill -9 "${pid}" 2>/dev/null || true
    fi
  else
    echo "${name}: PID ${pid} déjà mort."
  fi
  rm -f "${pid_file}"
}

start_back() {
  if is_running "${BACK_PID}"; then
    echo "API déjà en cours (PID $(cat "${BACK_PID}"))."
    return 0
  fi
  (
    cd "${ROOT}/apps/api"
    exec npm run dev
  ) >>"${BACK_LOG}" 2>&1 &
  echo $! >"${BACK_PID}"
  echo "API démarrée — PID $(cat "${BACK_PID}") — logs: ${BACK_LOG}"
}

start_front() {
  if is_running "${FRONT_PID}"; then
    echo "Web déjà en cours (PID $(cat "${FRONT_PID}"))."
    return 0
  fi
  (
    cd "${ROOT}/apps/web"
    exec npm run dev
  ) >>"${FRONT_LOG}" 2>&1 &
  echo $! >"${FRONT_PID}"
  echo "Web démarré — PID $(cat "${FRONT_PID}") — logs: ${FRONT_LOG}"
}

stop_back() { stop_one "API" "${BACK_PID}"; }
stop_front() { stop_one "Web" "${FRONT_PID}"; }

status_one() {
  local name="$1"
  local pid_file="$2"
  if is_running "${pid_file}"; then
    echo "${name}: actif (PID $(cat "${pid_file}"))"
  else
    echo "${name}: arrêté"
    if [[ -f "${pid_file}" ]]; then
      rm -f "${pid_file}"
    fi
  fi
}

TARGET="${1:-}"
ACTION="${2:-}"

if [[ -z "${TARGET}" || -z "${ACTION}" ]]; then
  echo "Usage: $0 <front|back|app> <start|stop|restart|status>" >&2
  exit 1
fi

case "${TARGET}" in
  back)
    case "${ACTION}" in
      start) start_back ;;
      stop) stop_back ;;
      restart) stop_back; sleep 1; start_back ;;
      status) status_one "API" "${BACK_PID}" ;;
      *) echo "Action inconnue: ${ACTION}" >&2; exit 1 ;;
    esac
    ;;
  front)
    case "${ACTION}" in
      start) start_front ;;
      stop) stop_front ;;
      restart) stop_front; sleep 1; start_front ;;
      status) status_one "Web" "${FRONT_PID}" ;;
      *) echo "Action inconnue: ${ACTION}" >&2; exit 1 ;;
    esac
    ;;
  app)
    case "${ACTION}" in
      start)
        start_back
        sleep 2
        start_front
        ;;
      stop)
        stop_front
        stop_back
        ;;
      restart)
        stop_front
        stop_back
        sleep 1
        start_back
        sleep 2
        start_front
        ;;
      status)
        status_one "API" "${BACK_PID}"
        status_one "Web" "${FRONT_PID}"
        ;;
      *) echo "Action inconnue: ${ACTION}" >&2; exit 1 ;;
    esac
    ;;
  *)
    echo "Cible inconnue: ${TARGET} (front|back|app)" >&2
    exit 1
    ;;
esac
