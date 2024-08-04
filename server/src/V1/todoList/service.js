const Todo = require('./todoListSchema')
const Counter = require('./counter')

const getAllTodosData = async (
  userId,
  filter = {},
  sort = { createdAt: -1 },
) => {
  const todos = await Todo.find({ userId, ...filter }).sort(sort)

  return todos
}

const getTodoByIdData = async (todoId) => {
  const todo = await Todo.findOne({ todoId })
  return todo
}

const createTodoData = async (userId, topic, notes, dueDate) => {
  if (!userId) {
    throw new Error('User ID is required')
  }

  // Convert dueDate to Date object if it's a string
  let parsedDueDate
  if (typeof dueDate === 'string') {
    parsedDueDate = new Date(dueDate)
    if (isNaN(parsedDueDate.getTime())) {
      throw new Error('Invalid date format')
    }
  } else {
    parsedDueDate = dueDate
  }

  const trSeq = await Counter.getNextSequence()
  const todo = await Todo.create({
    todoId: `TID_${trSeq}`,
    userId,
    topic,
    notes,
    dueDate: parsedDueDate,
  })

  return todo
}

const updateTodoData = async (todoId, topic, notes, completed, dueDate) => {
  const filter = { todoId }

  const update = {
    topic,
    notes,
    completed,
    dueDate,
  }

  const todo = await Todo.findOneAndUpdate(filter, update, { new: true })

  return todo
}

const deleteTodoData = async (todoId) => {
  const todo = await Todo.findOneAndDelete({ todoId })
  return todo
}
module.exports = {
  getAllTodosData,
  getTodoByIdData,
  createTodoData,
  updateTodoData,
  deleteTodoData,
}
