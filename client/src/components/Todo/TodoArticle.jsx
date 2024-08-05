import React from "react";
import { Link } from "react-router-dom";

const TodoArticle = ({ item }) => {
  return (
    <Link to={`/todo/${item.todoId}`}>
      <article
        key={item.todoId}
        className={`${
          item.completed ? "bg-green-100" : "bg-red-100"
        } group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200`}
      >
        <div className="px-3 py-4">
          <h3 className="text-sm text-gray-500 pb-2">
            <button
              className={`py-1 px-2 text-white rounded-lg ${
                item.completed ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {item.completed ? "Completed" : "Incomplete"}
            </button>
          </h3>
          <p className="text-base font-bold text-gray-700 group-hover:text-gray-900">
            {item.topic}
          </p>
          <p className="text-sm text-gray-500">
            {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "N/A"}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default TodoArticle;
