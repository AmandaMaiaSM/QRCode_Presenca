import React from "react";

import Sidebar from "../../components/Sidebar";
import "./styles.css";

export default function EventDetails() {
  return (
    <div className="dashboard-container"  >
      <Sidebar />
      
      <main className="main-content">
        <h1>CheckIn Page</h1>
        <p>Página de check-in</p>
      </main>
    </div>
  );
}