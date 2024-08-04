import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";
// api request to register a new user
export const registerUser = async (userData) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/user/register`,
      userData
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// api request to login a user
export const loginUser = async (userData) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/user/login`, userData);
    // setAuthToken(data.token); // Set the authentication token in the default headers
    return data;
    // console.log(data)
  } catch (error) {
    throw error;
  }
};

// thought of using it but not using it
export const logoutUser = () => {};

// api request to get all todos of a user
export const getTodoById = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todoList/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch todo details");
  }
};

export const getTodos = async (
  token,
  userId,
  filter = "all",
  sortBy = "dueDate",
  sortOrder = "asc",
  dueDateBefore = ""
) => {
  try {
    const params = {
      userId,
      completed:
        filter === "completed"
          ? "true"
          : filter === "incomplete"
          ? "false"
          : undefined,
      sortBy,
      sortOrder,
      dueDateBefore,
    };

    // Remove undefined parameters from the params object
    Object.keys(params).forEach(
      (key) => params[key] === undefined && delete params[key]
    );

    const { data } = await axios.get(`${API_BASE_URL}/todoList`, {
      headers: {
        "x-access-token": token,
      },
      params,
    });

    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// api request to create a new todo
export const createTodo = async (todo, token, userId) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/todoList`, todo, {
      headers: {
        "x-access-token": token,
      },
      params: {
        userId: userId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (todo, token) => {
  try {
    const { data } = await axios.patch(
      `${API_BASE_URL}/todoList/${todo.todoId}`, // Adjust the endpoint as necessary
      {
        topic: todo.topic,
        notes: todo.notes,
        completed: todo.completed,
        dueDate: todo.dueDate,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// api request to delete a todo by id
export const deleteTodo = async (id, token) => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/todoList/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
