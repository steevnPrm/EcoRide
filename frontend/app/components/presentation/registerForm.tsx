"use client";

import useRegisterForm from "../hooks/useRegisterForm";
import {
  errorText,
  formCard,
  formLabel,
  formLayout,
  pageTitle,
  primaryButton,
  successText,
  userInput,
} from "../token/ui.token";

export default function RegisterForm() {
  const { data, handleChange, handleSubmit, loading, error, success } =
    useRegisterForm();

  return (
    <div className={formLayout}>
      <div className={formCard}>
        <h1 className={pageTitle}>Créer un compte</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstname" className={formLabel}>
              Prénom
            </label>
            <input
              id="firstname"
              name="firstname"
              className={userInput}
              value={data.firstname}
              onChange={handleChange}
              placeholder="John"
            />
          </div>

          <div>
            <label htmlFor="lastname" className={formLabel}>
              Nom de famille
            </label>
            <input
              id="lastname"
              name="lastname"
              className={userInput}
              value={data.lastname}
              onChange={handleChange}
              placeholder="Doe"
            />
          </div>

          <div>
            <label htmlFor="username" className={formLabel}>
              Nom d’utilisateur
            </label>
            <input
              id="username"
              name="username"
              className={userInput}
              value={data.username}
              onChange={handleChange}
              placeholder="john_doe"
            />
          </div>

          <div>
            <label htmlFor="email" className={formLabel}>
              Adresse e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={userInput}
              value={data.email}
              onChange={handleChange}
              placeholder="john@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className={formLabel}>
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={userInput}
              value={data.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={formLabel}>
              Confirmation du mot de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={userInput}
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className={primaryButton}>
            {loading ? "Inscription..." : "S’inscrire"}
          </button>

          {error && <p className={errorText}>{error}</p>}
          {success && <p className={successText}>Inscription réussie 🎉</p>}
        </form>
      </div>
    </div>
  );
}
