#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Deploy to Google App Engine (no Docker needed)
# ─────────────────────────────────────────────────────────────────────────────
# Usage: ./scripts/deploy.sh [--project <PROJECT_ID>]
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

PROJECT_ID=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --project) PROJECT_ID="$2"; shift 2 ;;
    *)         echo "Unknown option: $1"; exit 1 ;;
  esac
done

# Get project from gcloud if not provided
if [[ -z "${PROJECT_ID}" ]]; then
  PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
fi

if [[ -z "${PROJECT_ID}" ]]; then
  echo "Error: No project set. Use --project <ID> or run: gcloud config set project <ID>"
  exit 1
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           Nourish — App Engine Deployment                   ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║  Project:  ${PROJECT_ID}"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Deploy to App Engine
echo "▸ Deploying to App Engine..."
gcloud app deploy app.yaml \
  --project="${PROJECT_ID}" \
  --quiet \
  --promote

# Get the URL
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  ✓ Deployment complete!"
echo ""
echo "  App URL: https://${PROJECT_ID}.appspot.com"
echo ""
echo "  Useful commands:"
echo "    gcloud app browse --project=${PROJECT_ID}"
echo "    gcloud app logs tail --project=${PROJECT_ID}"
echo "    gcloud app describe --project=${PROJECT_ID}"
echo "════════════════════════════════════════════════════════════════"
