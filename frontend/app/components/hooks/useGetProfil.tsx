import { useState, useEffect } from "react";

export function useGetProfil() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
  });
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/profile", {
          method: "GET",
          credentials: "include", // envoie le cookie httpOnly
        });

        if (!response.ok) {
          setError("Erreur lors de la récupération des données utilisateurs");
          return;
        }

        const user = await response.json();
        setData({
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
        });
      } catch (err) {
        setError("Erreur serveur, veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { data, setData, errors, setError, loading };
}
