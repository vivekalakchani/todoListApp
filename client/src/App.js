// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import DashBoard from "./pages/DashBoard";
import AllList from "./pages/AllList";
import AddList from "./pages/AddList";

const App = () => {
  return (
    <Router>
      <Header />
      <AddList />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/all-list" element={<AllList />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
