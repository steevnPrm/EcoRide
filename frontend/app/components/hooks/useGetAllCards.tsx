"use client";

import { useState, useEffect } from "react";

export interface Ride {
  id: string;
  departure: string;
  arrival: string;
  date: string;
  price?: string;
}

export default function useGetAllCards() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchRides() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/getAllRides", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result?.message ?? "Erreur récupération trajets");
      }

      const data: Ride[] = await response.json();
      setRides(data);
    } catch (err: any) {
      setError(err.message ?? "Erreur serveur");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRides();
  }, []);

  return {
    rides,
    loading,
    error,
    refresh: fetchRides,
  };
}
