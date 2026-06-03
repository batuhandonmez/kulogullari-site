import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasSupabaseConfig() {
  return Boolean(url && serviceKey);
}

export function getSupabaseAdmin() {
  if (!url || !serviceKey) {
    return null;
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
    realtime: {
      transport: WebSocket as unknown as typeof globalThis.WebSocket,
    },
  });
}
