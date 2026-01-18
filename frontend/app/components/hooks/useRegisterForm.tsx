"use client";

import { useState } from "react";
import { RegisterUserDTO } from "@/app/domain/dto/register-user-dto";

// Si tu as un service AuthService, tu peux l'importer ici
// import { AuthService } from "@/app/services/AuthService";

export default function useRegisterForm() {
  const [data, setData] = useState<RegisterUserDTO>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Gestion des changements dans le formulaire
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Gestion du submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Vérification simple côté front
    if (data.password !== data.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      const url = "http://localhost:3000/api/register";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Erreur serveur");
      }

      setSuccess(true);
      setData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setError(err.message || "Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
    success,
    handleChange,
    handleSubmit,
  };
}
