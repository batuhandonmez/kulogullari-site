import { NextResponse } from "next/server";
import { createLead, listLeads } from "@/lib/lead-store";
import { isAdmin } from "@/lib/auth";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const required = ["sector", "customer_name", "customer_phone", "customer_email"];
    const missing = required.filter((key) => !String(body[key] || "").trim());

    if (missing.length || !isEmail(body.customer_email)) {
      return NextResponse.json({ error: "Invalid lead payload" }, { status: 400 });
    }

    const lead = await createLead({
      sector: body.sector,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      city: body.city,
      message: body.message,
      answers: body.answers || {},
    });

    return NextResponse.json({ lead });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Lead could not be created" }, { status: 500 });
  }
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await listLeads();
  return NextResponse.json({ leads });
}
