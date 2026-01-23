"use client";

import { useRouter } from "next/navigation";
import { secondaryButton } from "../token/ui.token";

export default function DisconnectButton() {
  const router = useRouter();

  async function handleClick() {
    try {
      const response = await fetch("/api/disconnect", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la déconnexion");
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button className={secondaryButton} onClick={handleClick}>
      Déconnexion
    </button>
  );
}
