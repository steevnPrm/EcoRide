"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RideCard from "@/app/components/presentation/RideCard";

export default function RidePageClient() {
  const params = useParams();
  const [ride, setRide] = useState<any>(null);

  useEffect(() => {
    async function fetchRide() {
      const res = await fetch(`http://localhost:3001/rides/${params.id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setRide(data);
    }
    fetchRide();
  }, [params.id]);

  if (!ride) return <p>Chargement...</p>;

  return (
    <RideCard
      id={ride.id}
      departure={ride.departure}
      arrival={ride.arrival}
      date={ride.date}
      price={ride.price}
    />
  );
}
