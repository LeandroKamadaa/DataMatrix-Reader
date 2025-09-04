import React from "react";
import "./App.css"; // Importa o CSS
import Dashboard from "./components/Dashboard";
import Header from "./components/Header"
import ScannerModal from "./components/ScannerModal";

function App() {
  return (
    <div className="app-container">
      <ScannerModal/>
    </div>
  );
}

export default App;