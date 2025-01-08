import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Slider from "react-slick";
import { FaTrash } from "react-icons/fa";
import "../style/ClientScreens.css"; // Importation des styles

const ClientScreens = () => {
  const { clientId } = useParams();
  const [screenshots, setScreenshots] = useState([]);
  const [selectedScreenshots, setSelectedScreenshots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // Fetch screenshots
  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const response = await fetch(`http://localhost:8000/client-screenshots/${clientId}/`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des captures d'écran");
        const data = await response.json();
        setScreenshots(data.screenshots);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    fetchScreenshots();
  }, [clientId]);

  // Handle select/deselect
  const handleSelectScreenshot = (screenshot) => {
    setSelectedScreenshots((prev) =>
      prev.includes(screenshot) ? prev.filter((item) => item !== screenshot) : [...prev, screenshot]
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedScreenshots(checked ? [...screenshots] : []);
  };

  // Delete logic
  const handleDeleteScreenshot = async (screenshot) => {
    try {
      const filenameToDelete = screenshot.split("/").pop();
      const formData = new URLSearchParams();
      formData.append("screenshots", filenameToDelete);

      const response = await fetch(`http://localhost:8000/delete-client-screenshots/${clientId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await response.json();
      if (data.deleted_files.length > 0) {
        setScreenshots((prev) => prev.filter((url) => url !== screenshot));
        setSelectedScreenshots((prev) => prev.filter((url) => url !== screenshot));
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleDeleteAllSelected = async () => {
    try {
      const filenamesToDelete = selectedScreenshots.map((screenshot) => screenshot.split("/").pop());
      const formData = new URLSearchParams();
      filenamesToDelete.forEach((filename) => formData.append("screenshots", filename));

      const response = await fetch(`http://localhost:8000/delete-client-screenshots/${clientId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      const data = await response.json();
      if (data.deleted_files.length > 0) {
        setScreenshots((prev) => prev.filter((url) => !selectedScreenshots.includes(url)));
        setSelectedScreenshots([]);
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  // Modal logic
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const sliderSettings = {
    initialSlide: currentImageIndex,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)} className="back-button">
        Retour
      </button>

      <div className="select-all-container">
        <input
          type="checkbox"
          checked={selectedScreenshots.length === screenshots.length && screenshots.length > 0}
          onChange={(e) => handleSelectAll(e.target.checked)}
          className="select-all-checkbox"
        />
        <label>Sélectionner tous</label>
        {selectedScreenshots.length > 0 && (
          <button onClick={handleDeleteAllSelected} className="delete-selected-button">
            Supprimer la sélection
          </button>
        )}
      </div>

      <div className="grid-container">
        {screenshots.map((url, index) => (
          <div key={index} className="grid-item">
            <input
              type="checkbox"
              checked={selectedScreenshots.includes(url)}
              onChange={() => handleSelectScreenshot(url)}
              className="grid-item-checkbox"
            />
            <FaTrash
              onClick={() => handleDeleteScreenshot(url)}
              className="grid-item-trash"
            />
            <img
              src={url}
              alt={`Capture ${index + 1}`}
              className="grid-item-image"
              onClick={() => openModal(index)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 1000 },
          content: { inset: "10%", padding: 0, background: "none", border: "none", zIndex: 1001 },
        }}
        ariaHideApp={false}
      >
        <Slider {...sliderSettings}>
          {screenshots.map((url, index) => (
            <div key={index} className="modal-image-container">
              <img src={url} alt={`Capture ${index + 1}`} className="modal-image" />
            </div>
          ))}
        </Slider>
        <button onClick={closeModal} className="close-modal-button">
          Fermer
        </button>
      </Modal>
    </div>
  );
};

export default ClientScreens;