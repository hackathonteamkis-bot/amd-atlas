#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Manual Deploy Script — Build & Deploy to Cloud Run
# ─────────────────────────────────────────────────────────────────────────────
# Usage: ./scripts/deploy.sh [--project <PROJECT_ID>] [--region <REGION>]
#
# Builds the Docker image using Cloud Build and deploys to Cloud Run
# with secrets injected from Secret Manager.
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── Defaults ──
REGION="asia-south1"
SERVICE_NAME="nourish-app"
REPOSITORY="nourish-repo"
PROJECT_ID=""

# ── Parse arguments ──
while [[ $# -gt 0 ]]; do
  case $1 in
    --project) PROJECT_ID="$2"; shift 2 ;;
    --region)  REGION="$2"; shift 2 ;;
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

IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${SERVICE_NAME}"
TAG=$(git rev-parse --short HEAD 2>/dev/null || echo "manual")

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           Nourish — Cloud Run Deployment                    ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║  Project:  ${PROJECT_ID}"
echo "║  Region:   ${REGION}"
echo "║  Image:    ${IMAGE}:${TAG}"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# ── Step 1: Submit build to Cloud Build ──
echo "▸ Submitting build to Cloud Build..."
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions="_REGION=${REGION},_SERVICE_NAME=${SERVICE_NAME},_REPOSITORY=${REPOSITORY},SHORT_SHA=${TAG}" \
  --project="${PROJECT_ID}" \
  .

echo ""
echo "▸ Updating Cloud Run service with secrets..."

# ── Step 2: Update service with Secret Manager references ──
gcloud run services update "${SERVICE_NAME}" \
  --region="${REGION}" \
  --project="${PROJECT_ID}" \
  --update-secrets="DATABASE_URL=DATABASE_URL:latest,DIRECT_URL=DIRECT_URL:latest,AUTH_SECRET=AUTH_SECRET:latest,SMTP_HOST=SMTP_HOST:latest,SMTP_PORT=SMTP_PORT:latest,SMTP_USER=SMTP_USER:latest,SMTP_PASS=SMTP_PASS:latest,SMTP_FROM=SMTP_FROM:latest"

# ── Step 3: Get service URL ──
SERVICE_URL=$(gcloud run services describe "${SERVICE_NAME}" \
  --region="${REGION}" \
  --project="${PROJECT_ID}" \
  --format='value(status.url)')

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  ✓ Deployment complete!"
echo ""
echo "  Service URL: ${SERVICE_URL}"
echo ""
echo "  Useful commands:"
echo "    gcloud run services describe ${SERVICE_NAME} --region=${REGION}"
echo "    gcloud run services logs read ${SERVICE_NAME} --region=${REGION}"
echo "════════════════════════════════════════════════════════════════"
