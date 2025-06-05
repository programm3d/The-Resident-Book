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
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1a1a1a",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "14px",
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
