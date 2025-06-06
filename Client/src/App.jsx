import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import ResidentCard from "./components/ResidentCard";
import AddResidentModal from "./components/AddResidentModal";
import { getResidents } from "./api/residents";
import "./App.css";

function App() {
  const [residents, setResidents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const data = await getResidents();
      setResidents(data);
    } catch (error) {
      console.error("Error fetching residents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResident = (newResident) => {
    setResidents([newResident, ...residents]);
  };

  return (
    <div className="app">
      {/* Background decoration elements for glass effect */}
      <div className="background-decoration"></div>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(26, 26, 26, 0.9)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "14px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      />

      <Header onAddClick={() => setIsModalOpen(true)} />

      <main className="main-content">
        <div className="container">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : residents.length === 0 ? (
            <div className="empty-state">
              <p>No residents yet. Be the first to join!</p>
            </div>
          ) : (
            <div className="residents-grid">
              {residents.map((resident, index) => (
                <ResidentCard
                  key={resident._id}
                  resident={resident}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <AddResidentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleAddResident}
        />
      )}
    </div>
  );
}

export default App;
