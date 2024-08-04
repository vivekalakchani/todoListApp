const Service = require('./service')

const getAllTodos = async (req, res) => {
  const { userId } = req.query
  const { completed, sortBy, sortOrder, dueDateBefore } = req.query

  // Validate userId presence
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  // Build filter object
  const filter = {}
  if (completed) filter.completed = completed === 'true'
  if (dueDateBefore) filter.dueDate = { $lte: new Date(dueDateBefore) }

  // Build sort object
  const sort = {}
  if (sortBy) {
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1
  }

  try {
    const todos = await Service.getAllTodosData(userId, filter, sort)
    res.status(200).json(todos)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Server Error' })
  }
}

const getTodoById = async (req, res) => {
  const { todoId } = req.params

  try {
    const todos = await Service.getTodoByIdData(todoId)
    res.status(200).json(todos)
  } catch (error) {
    console.error(error.message)
    res.status(400).send(error.message)
  }
}

const createTodo = async (req, res) => {
  const { topic, notes, dueDate } = req.body
  const { userId } = req.query

  try {
    const todo = await Service.createTodoData(userId, topic, notes, dueDate)
    res.status(201).json(todo)
  } catch (error) {
    console.error(error.message)
    res.status(400).send(error.message)
  }
}

const updateTodo = async (req, res) => {
  const { todoId } = req.params
  const { topic, notes, completed, dueDate } = req.body

  try {
    const todo = await Service.updateTodoData(
      todoId,
      topic,
      notes,
      completed,
      dueDate,
    )
    res.status(200).json(todo)
  } catch (error) {
    console.error(error.message)
    res.status(400).send(error.message)
  }
}

const deleteTodo = async (req, res) => {
  const { todoId } = req.params

  try {
    const todo = await Service.deleteTodoData(todoId)
    res.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    console.error(error.message)
    res.status(400).send(error.message)
  }
}
module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
}
