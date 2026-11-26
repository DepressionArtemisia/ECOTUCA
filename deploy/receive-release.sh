#!/usr/bin/env bash
set -euo pipefail

if [[ ${SSH_ORIGINAL_COMMAND:-} =~ ^release\ ([0-9a-f]{40})\ ([0-9a-f]{64})$ ]]; then
  exec sudo -n /usr/local/sbin/ecotuca-release release "${BASH_REMATCH[1]}" "${BASH_REMATCH[2]}"
fi
echo "Only the ECOTUCA release command is allowed" >&2
exit 2
