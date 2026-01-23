import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Récupération du cookie côté server
    const cookieValue = (await cookies()).get('jwt')?.value;

    const response = await fetch(
      "http://localhost:3001/rides/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieValue ? `jwt=${cookieValue}` : "",
        },
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            result?.message ??
            "Veuillez renseigner un trajet valide",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Erreur BFF createRide:", error);
    return NextResponse.json(
      {
        message:
          "Erreur serveur : veuillez réessayer plus tard",
      },
      { status: 500 }
    );
  }
}
