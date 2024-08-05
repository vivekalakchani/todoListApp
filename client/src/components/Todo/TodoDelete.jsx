import React from "react";

const TodoDelete = ({ handleDelete, setConfirmation }) => {
  return (
    <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg shadow-md">
      <p className="text-gray-800">
        Are you sure you want to delete this todo?
      </p>
      <div className="mt-2 flex space-x-4">
        <button
          className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleDelete}
        >
          Yes, Delete
        </button>
        <button
          className="bg-gray-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => setConfirmation(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TodoDelete;
