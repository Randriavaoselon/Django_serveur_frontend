import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecentConnections = () => {
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentConnections = async () => {
      try {
        const response = await fetch("http://localhost:8000/recent-connections/");
        const data = await response.json();
        setConnections(data.recent_connections);
      } catch (error) {
        console.error("Erreur lors de la récupération des connexions :", error);
      }
    };

    fetchRecentConnections();
  }, []);

  const handleViewScreenshots = (clientId) => {
    navigate(`/client-screenshots/${clientId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Dernières Connexions</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {connections.map((client) => (
          <div
            key={client.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              width: "250px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => handleViewScreenshots(client.id)}
          >
            <h4>{client.pc_name || "Nom inconnu"}</h4>
            <p>Utilisateur : {client.nom_client}</p>
            <p>OS : {client.os_name || "Non spécifié"}</p>
            <p>IP : {client.ip_address}</p>
            <p>Dernière activité : {new Date(client.capture_time).toLocaleString()}</p>
            {client.screenshot ? (
              <img
                src={client.screenshot}  // Utilisation directe de l'URL complète de la capture
                alt="Capture d'écran"
                style={{ width: "100%", borderRadius: "5px" }}
              />
            ) : (
              <p>Aucune capture d'écran</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentConnections;