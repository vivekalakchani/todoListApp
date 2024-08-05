import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../../Services/api";
import { useSelector } from "react-redux";

export default function TodoForm() {
  // State to manage form input values
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Retrieve token and userId from Redux store
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Simple validation
    if (!topic || !notes || !dueDate) {
      setError("All fields are required");
      return;
    }

    setError("");

    // Construct the todo item object
    const newTodo = {
      topic,
      notes,
      dueDate,
    };

    try {
      // Use createTodo function to handle API call
      await createTodo(newTodo, token, userId);

      // Clear form on successful submission
      setTopic("");
      setNotes("");
      setDueDate("");

      // Redirect to the main page or another page
      navigate("/"); // Redirect to the homepage or any other desired route
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to create todo");
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#4F46E5"
            className="mx-auto h-12 w-12 text-indigo-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
          <h2 className="mt-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-800">
            Add Today's Task
          </h2>
        </div>

        <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-lg">
          <form
            className="space-y-6 bg-white p-8 rounded-lg shadow-lg ring-1 ring-gray-900/10"
            onSubmit={handleSubmit}
          >
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Topic
              </label>
              <input
                id="topic"
                name="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Notes
              </label>
              <input
                id="notes"
                name="notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-md shadow-lg hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
