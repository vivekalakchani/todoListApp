import React from "react";

const TodoDetailsView = ({ todo, setEditing, setConfirmation }) => {
  return (
    <div>
      <p className="text-xl font-semibold text-gray-800 mb-2">
        Topic:{" "}
        <span className="font-semibold text-gray-800">{todo.topic}</span>
      </p>
      <p className="text-base text-gray-800 mb-2">
        Notes:{" "}
        <span className="font-normal text-gray-600">{todo.notes}</span>
      </p>
      <p className="text-base text-gray-800 mb-2">
        Due Date:{" "}
        <span className="font-normal text-gray-600">
          {todo.dueDate
            ? new Date(todo.dueDate).toLocaleDateString()
            : "N/A"}
        </span>
      </p>
      <p className="text-base text-gray-800 mb-4">
        Status:{" "}
        <span
          className={`font-semibold ${
            todo.completed ? "text-green-600" : "text-red-600"
          }`}
        >
          {todo.completed ? "Completed" : "Incomplete"}
        </span>
      </p>
      <div className="flex space-x-4">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={() => setEditing(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
        <button
          className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setConfirmation(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoDetailsView;
