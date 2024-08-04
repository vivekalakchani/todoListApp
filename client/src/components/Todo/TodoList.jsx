import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getTodos } from "../../Services/api"; // Adjust the import path as necessary
import styled from "styled-components";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'incomplete'
  const [sortBy, setSortBy] = useState("dueDate"); // Field to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [dueDateBefore, setDueDateBefore] = useState(""); // Date filter
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTodos(
          token,
          userId,
          filter,
          sortBy,
          sortOrder,
          dueDateBefore
        );
        setItems(data);
      } catch (err) {
        setError("Error fetching todos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      fetchItems();
    }
  }, [token, userId, filter, sortBy, sortOrder, dueDateBefore]);

  return (
    <Container>
      <Sidebar>
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Filter:</label>
          <select
            className="p-2 border border-gray-300 rounded w-full"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Sort By:</label>
          <select
            className="p-2 border border-gray-300 rounded w-full mb-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate">Due Date</option>
            <option value="topic">Topic</option>
          </select>
          <label className="block text-sm font-medium mb-1">Order:</label>
          <select
            className="p-2 border border-gray-300 rounded w-full"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Due Date Before:
          </label>
          <input
            type="date"
            className="p-2 border border-gray-300 rounded w-full"
            value={dueDateBefore}
            onChange={(e) => setDueDateBefore(e.target.value)}
          />
        </div>
      </Sidebar>
      <MainContent>
        <h1 className="text-2xl font-bold mb-4">Todos</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : items.length > 0 ? (
          <div className="overflow-x-auto">
            <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {items.map((item) => (
                <article
                  key={item.todoId}
                  className={`bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 ${
                    item.completed ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <div className="px-3 py-4">
                    <h3 className="text-sm text-gray-500 pb-2">
                      <Link
                        className={`py-1 px-2 text-white rounded-lg ${
                          item.completed ? "bg-green-600" : "bg-red-600"
                        }`}
                        to={`/todo/${item.todoId}`} // Use 'to' instead of 'href'
                      >
                        {item.completed ? "Completed" : "Incomplete"}
                      </Link>
                    </h3>
                    <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                      {item.topic}
                    </p>
                    <p className="text-base text-gray-700">{item.notes}</p>
                    <p className="text-sm text-gray-500">
                      {item.dueDate
                        ? new Date(item.dueDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </article>
              ))}
            </section>
          </div>
        ) : (
          <p className="text-center text-gray-500">No todos available</p>
        )}
      </MainContent>
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  flex: 0 0 250px;
  padding: 20px;
  background: #f9f9f9;
  border-right: 1px solid #ddd;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;
