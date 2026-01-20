"use client";

import useLoginForm from "../hooks/useLoginForm";
import Link from "next/link";
import {
  userInput,
  formLabel,
  primaryButton,
  formCard,
  formLayout,
  errorText,
  successText,
  pageTitle,
  helperText,
} from "../token/ui.token";

export default function LoginForm() {
  const { handleChange, handleSubmit, data, error, success, loading } =
    useLoginForm();

  return (
    <div className={formLayout}>
      <div className={formCard}>
        <h1 className={pageTitle}>Connexion</h1>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className={formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className={userInput}
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className={formLabel}>
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className={userInput}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className={errorText}>{error}</p>}
          {success && <p className={successText}>Connexion réussie</p>}

          <button type="submit" className={primaryButton} disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className={`${helperText} mt-4 text-center`}>
          Vous n'avez pas de compte ?{" "}
          <Link
            href="/register"
            className="text-ecoride-green-500 font-semibold"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
