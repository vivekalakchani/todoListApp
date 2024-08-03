const mongoose = require('mongoose')
const TodoListCountersSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    seq: { type: Number, required: true },
  },
  { timestamps: true },
)

TodoListCountersSchema.statics.getNextSequence = async function () {
  const ret = await this.findOneAndUpdate(
    { id: 'autoVal' },
    { $inc: { seq: 1 } },
    {
      new: true,
      upsert: true,
    },
  )

  return ret.seq
}

// create model
const todoListCounter = new mongoose.model(
  'todoListCounters',
  TodoListCountersSchema,
)

module.exports = todoListCounter
