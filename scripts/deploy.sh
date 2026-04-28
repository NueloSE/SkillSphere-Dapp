#!/usr/bin/env bash
set -euo pipefail

NETWORK="${NETWORK:-testnet}"
SOURCE="${SOURCE:-default}"
ENV_FILE="${ENV_FILE:-.env.local}"

echo "Building contract..."
soroban contract build

WASM_PATH="$(find target/wasm32-unknown-unknown/release -name '*.wasm' | head -1)"
if [[ -z "$WASM_PATH" ]]; then
  echo "Error: .wasm file not found after build" >&2
  exit 1
fi
echo "Built: $WASM_PATH"

echo "Deploying to $NETWORK..."
CONTRACT_ID=$(soroban contract deploy \
  --wasm "$WASM_PATH" \
  --source "$SOURCE" \
  --network "$NETWORK")

echo "Contract ID: $CONTRACT_ID"

# Write to .env.local
if grep -q "^NEXT_PUBLIC_CONTRACT_ID=" "$ENV_FILE" 2>/dev/null; then
  sed -i "s|^NEXT_PUBLIC_CONTRACT_ID=.*|NEXT_PUBLIC_CONTRACT_ID=$CONTRACT_ID|" "$ENV_FILE"
else
  echo "NEXT_PUBLIC_CONTRACT_ID=$CONTRACT_ID" >> "$ENV_FILE"
fi

echo "Contract ID written to $ENV_FILE"
