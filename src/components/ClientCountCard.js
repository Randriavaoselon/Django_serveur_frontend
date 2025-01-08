import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientCountCard = () => {
  const [clientCount, setClientCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook pour la navigation

  useEffect(() => {
    // Remplacez l'URL par l'URL réelle de votre API
    fetch("http://localhost:8000/api/client-count/")
      .then((response) => response.json())
      .then((data) => {
        setClientCount(data.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du nombre de clients :", error);
        setLoading(false);
      });
  }, []);

  // Redirige vers la page des clients
  const handleCardClick = () => {
    navigate("/clients");
  };

  return (
    <div
      style={{
        background: "#38BDFF",
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        width: "300px",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={handleCardClick} // Redirection au clic
    >
      <h3>Nombre employer</h3>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{clientCount}</p>
      )}
    </div>
  );
};

export default ClientCountCard;
