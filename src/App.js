import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Tableau_board';
import ClientList from './pages/All_Clients';

import ClientScreens from './pages/ClientScreenshots';

import VideoStreamsClient from './components/AffichageClient';
//import FileList from './components/UploadFileClient';
import FileExplorer from './components/TesteFileClient';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          
          <Route exact path="/surveillance" element={<VideoStreamsClient/>} />
          <Route exact path="/" element={<Dashboard/>} />
          <Route exact path="/clients" element={<ClientList/>} />
          <Route path="/client-screenshots/:clientId" element={<ClientScreens />} />
          <Route path="/file" element={<FileExplorer />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;