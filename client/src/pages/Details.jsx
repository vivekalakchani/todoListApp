import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodoById, updateTodo, deleteTodo } from "../Services/api";
import { useSelector } from "react-redux";
import Header from "../components/Common/Header";
import TodoDetailsView from "../components/Todo/TodoDetailsView";
import TodoEdit from "../components/Todo/TodoEdit";
import TodoDelete from "../components/Todo/TodoDelete";

const Details = () => {
  const { id } = useParams();
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
        const data = await getTodoById(id, token);
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
      <div className="p-6 min-h-screen">
        <div className="max-w-4xl mx-auto bg-indigo-100 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Todo Details
          </h1>
          {editing ? (
            <TodoEdit
              updatedTopic={updatedTopic}
              setUpdatedTopic={setUpdatedTopic}
              updatedNotes={updatedNotes}
              setUpdatedNotes={setUpdatedNotes}
              updatedDueDate={updatedDueDate}
              setUpdatedDueDate={setUpdatedDueDate}
              completed={completed}
              setCompleted={setCompleted}
              handleUpdate={handleUpdate}
              setEditing={setEditing}
            />
          ) : confirmation ? (
            <TodoDelete
              handleDelete={handleDelete}
              setConfirmation={setConfirmation}
            />
          ) : (
            <TodoDetailsView
              todo={todo}
              setEditing={setEditing}
              setConfirmation={setConfirmation}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
