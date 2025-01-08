import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/SideBar";
import ClientCountCard from "../components/ClientCountCard";
import CardList from "../components/CardListe";
import RecentConnections from "../components/RecentConnections";
import "../style/board.css";

const Dashboard = () => {
  return (
    <Box display="flex" className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 3 }}>
        {/* Navbar */}
        <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mon Dashboard
            </Typography>
            <Typography variant="body1" sx={{ cursor: "pointer", mr: 2 }}>
              Profil
            </Typography>
            <Typography variant="body1" sx={{ cursor: "pointer" }}>
              Déconnexion
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          {/* Cards Section */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3}>
                <ClientCountCard />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Paper elevation={3}>
                <CardList />
              </Paper>
            </Grid>
          </Grid>

          {/* Details Section */}
          <Box sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <RecentConnections />
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;

