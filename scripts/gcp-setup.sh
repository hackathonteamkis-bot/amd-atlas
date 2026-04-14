#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# GCP Project Setup Script for Nourish App (App Engine)
# ─────────────────────────────────────────────────────────────────────────────
# Usage: ./scripts/gcp-setup.sh <PROJECT_ID>
#
# Enables required GCP APIs, initializes App Engine, and sets up
# environment variables for the deployment.
#
# Prerequisites:
#   - gcloud CLI installed and authenticated
#   - Billing enabled on the GCP project
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── Configuration ──
PROJECT_ID="${1:?Usage: $0 <PROJECT_ID>}"
REGION="asia-south1"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           Nourish — GCP Project Setup (App Engine)          ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║  Project:    ${PROJECT_ID}"
echo "║  Region:     ${REGION}"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# ── Set project ──
echo "▸ Setting active project..."
gcloud config set project "${PROJECT_ID}"

# ── Enable required APIs ──
echo "▸ Enabling required GCP APIs..."
gcloud services enable \
  appengine.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com \
  cloudresourcemanager.googleapis.com

echo "  ✓ APIs enabled"

# ── Initialize App Engine ──
echo "▸ Initializing App Engine..."
gcloud app create --region="${REGION}" 2>/dev/null || echo "  ℹ App Engine already initialized"
echo "  ✓ App Engine ready"

# ── Create secrets in Secret Manager ──
echo "▸ Setting up Secret Manager secrets..."
SECRETS=(
  "DATABASE_URL"
  "DIRECT_URL"
  "AUTH_SECRET"
  "SMTP_HOST"
  "SMTP_PORT"
  "SMTP_USER"
  "SMTP_PASS"
  "SMTP_FROM"
)

for SECRET in "${SECRETS[@]}"; do
  gcloud secrets create "${SECRET}" \
    --replication-policy="automatic" \
    2>/dev/null || echo "  ℹ Secret '${SECRET}' already exists"
done

echo "  ✓ Secrets created"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  Setup complete! Next steps:"
echo ""
echo "  1. Add secret values to each secret:"
echo "     echo -n 'your-database-url' | gcloud secrets versions add DATABASE_URL --data-file=-"
echo "     echo -n 'your-direct-url'   | gcloud secrets versions add DIRECT_URL --data-file=-"
echo "     echo -n 'your-auth-secret'  | gcloud secrets versions add AUTH_SECRET --data-file=-"
echo "     echo -n 'smtp.gmail.com'    | gcloud secrets versions add SMTP_HOST --data-file=-"
echo "     echo -n '587'               | gcloud secrets versions add SMTP_PORT --data-file=-"
echo "     echo -n 'your@email'        | gcloud secrets versions add SMTP_USER --data-file=-"
echo "     echo -n 'your-app-pass'     | gcloud secrets versions add SMTP_PASS --data-file=-"
echo "     echo -n 'Nourish'           | gcloud secrets versions add SMTP_FROM --data-file=-"
echo ""
echo "  2. Set env vars in app.yaml (edit the env_variables section)"
echo "     Or pass them at deploy time via the deploy script."
echo ""
echo "  3. Deploy:"
echo "     ./scripts/deploy.sh"
echo "════════════════════════════════════════════════════════════════"
