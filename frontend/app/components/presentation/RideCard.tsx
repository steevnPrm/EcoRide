"use client"

import { useRouter } from "next/navigation";


import { formCard, sectionTitle, formLabel, helperText } from "../token/ui.token";

interface RideCardProps {
  id: string;
  departure: string;
  arrival: string;
  date: string;
  price?: string;
}

export default function RideCard({
  id,
  departure,
  arrival,
  date,
  price,
}: RideCardProps) {

  const router = useRouter()

  async function handleClick() {
    if (!id) {
      console.error("RideCard id is missing!");
      alert("ID du trajet manquant");
      return;
    }

    try {
      // fetch du trajet spécifique avec l'id passé en props
      const response = await fetch(`http://localhost:3001/rides/${id}`,{
        credentials : "include"
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Impossible de récupérer le trajet");
      }

      const ride = await response.json(); // une seule fois

      // navigation vers la page dynamique
      router.push(`/rides/${id}`);

      return ride;
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Erreur lors de la récupération du trajet");
    }
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      className={formCard}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <h2 className={sectionTitle}>
        Trajet : {departure} → {arrival}
      </h2>

      <div className="mt-4">
        <h3 className={formLabel}>Date</h3>
        <p className={helperText}>{date}</p>
      </div>

      {price && (
        <div className="mt-2">
          <h3 className={formLabel}>Prix</h3>
          <p className={helperText}>{price}</p>
        </div>
      )}
    </div>
  )
}
