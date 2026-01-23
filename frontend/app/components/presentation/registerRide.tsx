"use client";

import useCreateRide from "../hooks/useCreateRide";
import {
  formLayout,
  formCard,
  formLabel,
  userInput,
  primaryButton,
  errorText,
  successText,
} from "../token/ui.token";

export default function RegisterRide() {
  const {
    formData,
    loading,
    error: errorMessage,
    success: successMessage,
    handleChange,
    handleSubmit,
  } = useCreateRide();

  return (
    <div className={formLayout}>
      <form
        className={formCard}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label className={formLabel}>Départ</label>
        <input
          className={userInput}
          name="departure"
          value={formData.departure}
          onChange={handleChange}
          disabled={loading}
        />

        <label className={formLabel}>Arrivée</label>
        <input
          className={userInput}
          name="arrival"
          value={formData.arrival}
          onChange={handleChange}
          disabled={loading}
        />

        <button className={primaryButton} type="submit" disabled={loading}>
          {loading ? "Création..." : "Créer la route"}
        </button>

        {errorMessage && <p className={errorText}>{errorMessage}</p>}

        {successMessage && <p className={successText}>{successMessage}</p>}
      </form>
    </div>
  );
}
