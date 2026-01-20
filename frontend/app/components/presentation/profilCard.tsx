"use client";

import { useGetProfil } from "../hooks/useGetProfil";
import {
  formCard,
  sectionTitle,
  userInput,
  errorText,
  skeletonInput,
} from "../token/ui.token";
import DisconnectButton from "./disconnectButton";

export default function ProfilCard() {
  const { data, errors, loading } = useGetProfil();

  return (
    <div className="flex justify-center mt-10">
      <div className={formCard}>
        <h2 className={sectionTitle}>Mon profil</h2>

        {/* Loading skeleton */}
        {loading && (
          <div className="flex flex-col gap-4 mt-4">
            <div className={skeletonInput}></div>
            <div className={skeletonInput}></div>
            <div className={skeletonInput}></div>
          </div>
        )}

        {/* Erreur */}
        {errors && <p className={errorText}>{errors}</p>}

        {/* Profil */}
        {!loading && !errors && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-xs text-gray-500">Prénom</label>
              <input className={userInput} value={data.firstname} readOnly />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-500">Nom</label>
              <input className={userInput} value={data.lastname} readOnly />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-500">Nom d’utilisateur</label>
              <input className={userInput} value={data.username} readOnly />
            </div>
          </div>
        )}
      </div>
      <div>
        < DisconnectButton />
      </div>
    </div>
  );
}
