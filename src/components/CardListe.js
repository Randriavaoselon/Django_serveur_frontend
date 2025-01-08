import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ActiveClientsCard = () => {
  const [activeClients, setActiveClients] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveClients = async () => {
      try {
        const response = await fetch("http://localhost:8000/active-client-count/");
        const data = await response.json();
        setActiveClients(data.active_clients);
      } catch (error) {
        console.error("Erreur lors de la récupération des clients actifs :", error);
      }
    };

    // Récupérer les clients actifs toutes les 5 secondes
    fetchActiveClients();
    const interval = setInterval(fetchActiveClients, 5000);

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  // Gérer le clic sur la carte
  const handleCardClick = () => {
    navigate("/surveillance");
  };

  return (
    <div
      style={{
        background: "#00B652",
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        width: "300px",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <h3>Employés Actifs</h3>
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{activeClients}</p>
    </div>
  );
};

export default ActiveClientsCard;
