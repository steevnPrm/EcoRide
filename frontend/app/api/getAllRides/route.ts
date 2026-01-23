import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    // Récupération du cookie JWT
    const jwt = (await cookies()).get("jwt")?.value;

    // Forward vers le backend
    const response = await fetch("http://localhost:3001/rides/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: jwt ? `jwt=${jwt}` : "",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message ?? "Erreur lors de la récupération des trajets" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erreur GET /rides:", error);
    return NextResponse.json(
      { message: "Erreur serveur : veuillez réessayer plus tard" },
      { status: 500 }
    );
  }
}
