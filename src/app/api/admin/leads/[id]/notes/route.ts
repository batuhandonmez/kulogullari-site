import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { addLeadNote, listLeadNotes } from "@/lib/lead-store";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notes = await listLeadNotes();
  return NextResponse.json({ notes });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { note } = await request.json();

  if (!String(note || "").trim()) {
    return NextResponse.json({ error: "Note is required" }, { status: 400 });
  }

  const entry = await addLeadNote(id, note);
  return NextResponse.json({ note: entry });
}
