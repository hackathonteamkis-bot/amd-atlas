import { NextResponse } from "next/server";

/**
 * Health check endpoint for Cloud Run / load balancer probes.
 * Returns 200 OK with basic service info.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "healthy",
      service: "nourish-app",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

export const runtime = "edge";
