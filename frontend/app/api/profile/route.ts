import { cookies } from "next/headers";

// app/api/profile/route.ts
export async function GET(req: Request) {
  try {
    // Récupère le JWT depuis les cookies du navigateur
    const cookie = (await cookies()).get("jwt")?.value;

    if (!cookie) {
      return new Response(JSON.stringify({ error: "Token manquant" }), {
        status: 401,
      });
    }

    console.log("cookie à envoyer : ", cookie);
    // Appel au backend NestJS en envoyant le cookie
    const response = await fetch("http://localhost:3001/auth/profile", {
      method: "GET",
      headers: { cookie: `jwt=${cookie}` },
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: data.message || `Erreur ${response.status}` }),
        { status: response.status },
      );
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Erreur serveur" }),
      { status: 500 },
    );
  }
}
