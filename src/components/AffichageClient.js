import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/VideoStreamsClient.css"; // Ajout des styles externes

const VideoStreamsClient = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const fetchClients = () => {
    axios
      .get("http://127.0.0.1:8000/api/active-clients/")
      .then((response) => {
        setClients(response.data.clients);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des clients :", error);
      });
  };

  useEffect(() => {
    fetchClients();
    const intervalId = setInterval(fetchClients, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const handleBackClick = () => {
    window.history.back(); // Retour à la page précédente
  };

  return (
    <div className="video-streams-container">
      <div className="clients-list">
        <div className="header">
          <button className="back-button-stream" onClick={handleBackClick}>
            &#8592; {/* Flèche gauche */}
          </button>
          <h2 className="title">Liste des Clients</h2>
        </div>
        {clients.map((client) => (
          <div
            key={client.id}
            className="client-card"
            onClick={() => handleClientClick(client)}
          >
            <h4>{client.pc_name}</h4>
            <p>IP : {client.ip_address}</p>
            <img
              src={`http://127.0.0.1:8000/video_feed/?client_id=${client.id}`}
              alt={`Flux de ${client.pc_name}`}
              className="client-image"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Pas+de+vidéo";
              }}
            />
          </div>
        ))}
      </div>
      {selectedClient && (
        <div className="selected-client-container">
          <div className="selected-client-video">
            {/* Boutons au-dessus de l'image */}
            <div className="button-group-overlay">
              <button className="btn-overlay">Controler</button>
              <button className="btn-overlay">Parcourir fichier</button>
              <button className="btn-overlay">Autre Action</button>
            </div>
            <img
              src={`http://127.0.0.1:8000/video_feed/?client_id=${selectedClient.id}`}
              alt={`Flux de ${selectedClient.pc_name}`}
              className="selected-video"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/640x360?text=Pas+de+vidéo";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoStreamsClient;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../style/VideoStreamsClient.css"; // Ajout des styles externes

// const VideoStreamsClient = () => {
//   const [clients, setClients] = useState([]);
//   const [selectedClient, setSelectedClient] = useState(null);

//   const fetchClients = () => {
//     axios
//       .get("http://127.0.0.1:8000/api/active-clients/")
//       .then((response) => {
//         setClients(response.data.clients);
//       })
//       .catch((error) => {
//         console.error("Erreur lors de la récupération des clients :", error);
//       });
//   };

//   useEffect(() => {
//     fetchClients();
//     const intervalId = setInterval(fetchClients, 5000);
//     return () => clearInterval(intervalId);
//   }, []);

//   const handleClientClick = (client) => {
//     setSelectedClient(client);
//   };

//   const handleBackClick = () => {
//     window.history.back(); // Retour à la page précédente
//   };

//   return (
//     <div className="video-streams-container">
//       <div className="clients-list">
//         <div className="header">
//           <button className="back-button" onClick={handleBackClick}>
//             &#8592; {/* Flèche gauche */}
//           </button>
//           <h2 className="title">Liste des Clients</h2>
//         </div>
//         {clients.map((client) => (
//           <div
//             key={client.id}
//             className="client-card"
//             onClick={() => handleClientClick(client)}
//           >
//             <h4>{client.pc_name}</h4>
//             <p>IP : {client.ip_address}</p>
//             <img
//               src={`http://127.0.0.1:8000/video_feed/?client_id=${client.id}`}
//               alt={`Flux de ${client.pc_name}`}
//               className="client-image"
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/300x200?text=Pas+de+vidéo";
//               }}
//             />
//           </div>
//         ))}
//       </div>
//       {selectedClient && (
//         <div className="selected-client-container">
//           <div className="selected-client-video">
//             <img
//               src={`http://127.0.0.1:8000/video_feed/?client_id=${selectedClient.id}`}
//               alt={`Flux de ${selectedClient.pc_name}`}
//               className="selected-video"
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/640x360?text=Pas+de+vidéo";
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoStreamsClient;
