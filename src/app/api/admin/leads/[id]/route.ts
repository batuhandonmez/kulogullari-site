import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { updateLeadStatus } from "@/lib/lead-store";
import type { LeadStatus } from "@/lib/lead-types";

const statuses: LeadStatus[] = ["new", "reviewing", "quote", "completed", "cancelled"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  if (!statuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const lead = await updateLeadStatus(id, status);
  return NextResponse.json({ lead });
}
