"use client";

import { useState } from "react";

export default function useCreateRide() {
  const [formData, setFormData] = useState({
    departure: "",
    arrival: "",
  });

  const [success, setSuccessText] = useState<string>("");
  const [error, setErrorText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    setLoading(true);
    setErrorText("");
    setSuccessText("");

    try {
      const response = await fetch("http://localhost:3000/api/createRide", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Erreur serveur");
      }

      setSuccessText("Route créée avec succès !");
      return result;
    } catch (error) {
      setErrorText(
        "Erreur lors de la création de la route, veuillez réessayer.",
      );
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    formData,
    loading,
    success,
    error,
    handleChange,
    handleSubmit,
  };
}
