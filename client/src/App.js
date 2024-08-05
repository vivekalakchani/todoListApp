// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Details from "./pages/Details";
import TodoForm from "./components/Todo/TodoForm";

const App = () => {
  return (
    <div className="App text-light">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo/:id" element={<Details />} />
          <Route path="/todoForm" element={<TodoForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
