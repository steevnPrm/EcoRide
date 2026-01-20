// app/api/disconnect/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  (await cookieStore).delete("jwt");

  return NextResponse.json(
    { success: true, message: "Déconnexion effectuée" },
    { status: 200 }
  );
}
