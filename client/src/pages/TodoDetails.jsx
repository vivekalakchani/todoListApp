import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodoById, updateTodo, deleteTodo } from "../Services/api";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const TodoDetails = () => {
  const { id } = useParams(); // Get the todo ID from the URL
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedTopic, setUpdatedTopic] = useState("");
  const [updatedNotes, setUpdatedNotes] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTodoById(id, token); // Ensure getTodoById is correctly implemented
        setTodo(data);
        setUpdatedTopic(data.topic);
        setUpdatedNotes(data.notes);
        setUpdatedDueDate(
          data.dueDate ? new Date(data.dueDate).toISOString().split("T")[0] : ""
        );
        setCompleted(data.completed);
      } catch (err) {
        setError("Error fetching todo");
        console.error("Error fetching todo:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      fetchTodo();
    } else {
      setError("Token or ID is missing");
      setLoading(false);
    }
  }, [token, id]);

  const handleUpdate = async () => {
    try {
      await updateTodo(
        {
          todoId: id,
          topic: updatedTopic,
          notes: updatedNotes,
          dueDate: updatedDueDate,
          completed: completed,
        },
        token
      );
      setEditing(false);
      navigate("/"); // Redirect after update
    } catch (err) {
      setError("Error updating todo");
      console.error("Error updating todo:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(id, token);
      navigate("/"); // Redirect after delete
    } catch (err) {
      setError("Error deleting todo");
      console.error("Error deleting todo:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!todo) return <p>No todo found</p>;

  return (
    <>
      <Header />
      <div className="p-6  min-h-screen">
        <div className="max-w-4xl mx-auto bg-indigo-100 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Todo Details
          </h1>
          {editing ? (
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
                  className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl font-semibold text-gray-800 mb-2">
                Topic:{" "}
                <span className="font-semibold text-gray-800">
                  {todo.topic}
                </span>
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
              {confirmation && (
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
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoDetails;
