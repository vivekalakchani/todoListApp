const mongoose = require('mongoose')
const User = require('../user/UserSchema')

const todoSchema = new mongoose.Schema({
  todoId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  topic: {
    type: String,
    required: [true, 'Add Topic'],
  },
  notes: {
    type: String,
    required: [true, 'Add notes'],
  },

  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: { type: Date },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
