import React from "react";  
import Sidebar from "../../components/Sidebar";




export default function Events() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <h1>Events Page</h1>
        <p>Página de eventos</p>
      </main>
    </div>
  );
}