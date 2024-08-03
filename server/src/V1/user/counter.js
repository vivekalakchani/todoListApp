const mongoose = require('mongoose')
const UserCountersSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    seq: { type: Number, required: true },
  },
  { timestamps: true },
)

UserCountersSchema.statics.getNextSequence = async function () {
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
const userCounter = new mongoose.model('userCounters', UserCountersSchema)

module.exports = userCounter
