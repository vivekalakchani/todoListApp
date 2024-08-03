const mongoose = require("mongoose");
const CountersSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    seq: { type: Number, required: true },
  },
  { timestamps: true }
);

CountersSchema.statics.getNextSequence = async function () {
  const ret = await this.findOneAndUpdate(
    { id: "autoval" },
    { $inc: { seq: 1 } },
    {
      new: true,
      upsert: true,
    }
  );

  return ret.seq;
};

// create model
const counter = new mongoose.model("counters", CountersSchema);

module.exports = counter;
