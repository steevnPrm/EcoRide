"use client";

import RideCard from "../components/presentation/RideCard";
import useGetAllCards from "../components/hooks/useGetAllCards";
import { skeletonInput, errorText } from "../components/token/ui.token";

export default function Page() {
  const { rides, loading, error } = useGetAllCards();

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {loading && (
        <div className="flex flex-col gap-4 w-full max-w-md">
          {[1, 2, 3].map((i) => (
            <div key={i} className={skeletonInput} />
          ))}
        </div>
      )}

      {error && <p className={errorText}>{error}</p>}

      {!loading && !error && rides.length === 0 && (
        <p className="text-ecoride-gray-700">Aucun trajet disponible.</p>
      )}

      {!loading && !error && rides.length > 0 && (
        <div
        className="flex flex-col gap-4 w-full max-w-md">
          {rides.map((ride) => (
            <RideCard
              key={ride.id}
              departure={ride.departure}
              arrival={ride.arrival}
              date={ride.date}
              price={ride.price} id={ride.id}/>
          ))}
        </div>
      )}
    </div>
  );
}
