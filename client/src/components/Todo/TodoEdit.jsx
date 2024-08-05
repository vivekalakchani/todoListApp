import React from "react";

const TodoEdit = ({
  updatedTopic,
  setUpdatedTopic,
  updatedNotes,
  setUpdatedNotes,
  updatedDueDate,
  setUpdatedDueDate,
  completed,
  setCompleted,
  handleUpdate,
  setEditing,
}) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Topic:
        </label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={updatedTopic}
          onChange={(e) => setUpdatedTopic(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes:
        </label>
        <textarea
          className="p-3 border border-gray-300 rounded-lg w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={updatedNotes}
          onChange={(e) => setUpdatedNotes(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date:
        </label>
        <input
          type="date"
          className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={updatedDueDate}
          onChange={(e) => setUpdatedDueDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Completed:
        </label>
        <select
          className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={completed ? "true" : "false"}
          onChange={(e) => setCompleted(e.target.value === "true")}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow-lg hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400"
          onClick={handleUpdate}
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TodoEdit;
