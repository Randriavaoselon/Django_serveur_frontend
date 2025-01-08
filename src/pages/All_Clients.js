import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [nomClient, setNomClient] = useState("");

  const navigate = useNavigate(); // Initialiser useNavigate

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/clients/");
      const data = await response.json();
      setClients(data.clients);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients :", error);
      setLoading(false);
    }
  };

  const deleteClient = async (clientId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/clients_delete/${clientId}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
        alert("Client supprimé avec succès !");
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de la suppression :", errorData.error);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  const handleOpen = (client) => {
    setSelectedClient(client);
    setNomClient(client.nom_client || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSelectedClient(null);
    }, 200);
  };

  const updateClientInfo = async () => {
    if (!selectedClient) return;

    try {
      const response = await fetch(`http://localhost:8000/api/clients/${selectedClient.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom_client: nomClient }),
      });

      if (response.ok) {
        const updatedClient = await response.json();
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === updatedClient.client.id ? updatedClient.client : client
          )
        );
        handleClose();
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de la mise à jour :", errorData.error);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px", marginLeft: "20px" }}
        onClick={() => navigate(-1)} // Retourner à la page précédente
      >
        Retour
      </Button>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center", margin: "20px 0" }}>
        Liste des employés
      </Typography>
      {clients.length === 0 ? (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          Aucun employer enregistré.
        </Typography>
      ) : (
        <TableContainer component={Paper} style={{ maxWidth: "90%", margin: "0 auto" }}>
          <Table>
            <TableHead style={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell style={{ color: "#fff" }}>ID</TableCell>
                <TableCell style={{ color: "#fff" }}>Nom du PC</TableCell>
                <TableCell style={{ color: "#fff" }}>Nom du Client</TableCell>
                <TableCell style={{ color: "#fff" }}>Système d'exploitation</TableCell>
                <TableCell style={{ color: "#fff" }}>Adresse IP</TableCell>
                <TableCell style={{ color: "#fff" }}>Date de capture</TableCell>
                <TableCell style={{ color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} hover>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.pc_name}</TableCell>
                  <TableCell>{client.nom_client}</TableCell>
                  <TableCell>{client.os_name}</TableCell>
                  <TableCell>{client.ip_address}</TableCell>
                  <TableCell>{client.capture_time}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(client)}
                      style={{ marginRight: "10px" }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteClient(client.id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {open && (
        <Dialog open={open} onClose={handleClose} keepMounted>
          <DialogTitle>Modifier l'employé</DialogTitle>
          <DialogContent>
            <TextField
              label="Nom du Client"
              fullWidth
              value={nomClient}
              onChange={(e) => setNomClient(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Annuler
            </Button>
            <Button onClick={updateClientInfo} color="primary" variant="contained">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ClientList;
