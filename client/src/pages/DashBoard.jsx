import React from "react";
import Header from "../components/Common/Header";
import TodoList from "../components/Todo/TodoList";

export default function DashBoard() {
  return (
    <div className="mt-5 py-3">
      <Header />
      <TodoList />
    </div>
  );
}
