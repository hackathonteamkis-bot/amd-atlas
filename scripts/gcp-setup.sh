#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# GCP Project Setup Script for Nourish App
# ─────────────────────────────────────────────────────────────────────────────
# Usage: ./scripts/gcp-setup.sh <PROJECT_ID>
#
# This script enables required GCP APIs, creates an Artifact Registry
# repository, and sets up Secret Manager secrets for Cloud Run.
#
# Prerequisites:
#   - gcloud CLI installed and authenticated
#   - Billing enabled on the GCP project
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── Configuration ──
PROJECT_ID="${1:?Usage: $0 <PROJECT_ID>}"
REGION="asia-south1"
SERVICE_NAME="nourish-app"
REPOSITORY="nourish-repo"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           Nourish — GCP Project Setup                       ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║  Project:    ${PROJECT_ID}"
echo "║  Region:     ${REGION}"
echo "║  Service:    ${SERVICE_NAME}"
echo "║  Registry:   ${REPOSITORY}"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# ── Set project ──
echo "▸ Setting active project..."
gcloud config set project "${PROJECT_ID}"

# ── Enable required APIs ──
echo "▸ Enabling required GCP APIs..."
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  cloudresourcemanager.googleapis.com \
  iam.googleapis.com

echo "  ✓ APIs enabled"

# ── Create Artifact Registry repository ──
echo "▸ Creating Artifact Registry repository..."
gcloud artifacts repositories create "${REPOSITORY}" \
  --repository-format=docker \
  --location="${REGION}" \
  --description="Docker images for Nourish app" \
  2>/dev/null || echo "  ℹ Repository already exists"

echo "  ✓ Artifact Registry ready"

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

echo ""
echo "  ⚠  You need to add values to each secret:"
echo "     gcloud secrets versions add DATABASE_URL --data-file=-"
echo "     (then paste the value and press Ctrl+D)"
echo ""
echo "  ✓ Secrets created"

# ── Grant Cloud Run access to secrets ──
echo "▸ Configuring IAM for Cloud Run..."
PROJECT_NUMBER=$(gcloud projects describe "${PROJECT_ID}" --format='value(projectNumber)')
COMPUTE_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"
CLOUD_BUILD_SA="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"

# Grant Cloud Run service account access to secrets
for SECRET in "${SECRETS[@]}"; do
  gcloud secrets add-iam-policy-binding "${SECRET}" \
    --member="serviceAccount:${COMPUTE_SA}" \
    --role="roles/secretmanager.secretAccessor" \
    --quiet 2>/dev/null || true
done

# Grant Cloud Build permission to deploy to Cloud Run
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${CLOUD_BUILD_SA}" \
  --role="roles/run.admin" \
  --quiet 2>/dev/null || true

gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${CLOUD_BUILD_SA}" \
  --role="roles/iam.serviceAccountUser" \
  --quiet 2>/dev/null || true

echo "  ✓ IAM configured"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  Setup complete! Next steps:"
echo ""
echo "  1. Add secret values:"
echo "     echo -n 'your-database-url' | gcloud secrets versions add DATABASE_URL --data-file=-"
echo "     echo -n 'your-direct-url'   | gcloud secrets versions add DIRECT_URL --data-file=-"
echo "     echo -n 'your-auth-secret'  | gcloud secrets versions add AUTH_SECRET --data-file=-"
echo "     echo -n 'smtp.gmail.com'    | gcloud secrets versions add SMTP_HOST --data-file=-"
echo "     echo -n '587'               | gcloud secrets versions add SMTP_PORT --data-file=-"
echo "     echo -n 'your@email'        | gcloud secrets versions add SMTP_USER --data-file=-"
echo "     echo -n 'your-app-pass'     | gcloud secrets versions add SMTP_PASS --data-file=-"
echo "     echo -n 'Nourish'           | gcloud secrets versions add SMTP_FROM --data-file=-"
echo ""
echo "  2. Deploy manually:"
echo "     ./scripts/deploy.sh"
echo ""
echo "  3. Or set up a Cloud Build trigger for auto-deploy on push"
echo "════════════════════════════════════════════════════════════════"
