import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileExplorer = () => {
  const [fileList, setFileList] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState("C:\\");

  // Fonction pour récupérer la liste des fichiers
  const fetchFileList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/file_list/');
      setFileList(response.data.file_list || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des fichiers", error);
    }
  };

  // Fonction pour changer de répertoire
  const changeDirectory = async (folderName) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/change_directory/', { folder_name: folderName });
      if (response.data.response) {
        setCurrentDirectory(folderName);
        fetchFileList();
      }
    } catch (error) {
      console.error("Erreur lors du changement de répertoire", error);
    }
  };

  useEffect(() => {
    fetchFileList();
  }, [currentDirectory]);

  return (
    <div>
      <h2>Explorateur de fichiers</h2>
      <h3>Répertoire actuel: {currentDirectory}</h3>
      <button onClick={() => changeDirectory("..")}>Remonter</button>
      <ul>
        {fileList.map((file, index) => (
          <li key={index}>
            {file.startsWith("[DIR]") ? (
              <button onClick={() => changeDirectory(file.substring(6))}>
                {file}
              </button>
            ) : (
              <span>{file}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
