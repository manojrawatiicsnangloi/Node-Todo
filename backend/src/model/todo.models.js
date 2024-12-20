const { default: mongoose } = require("mongoose");
const User = require("./user.model");

const todoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: User },
    todo_title: { type: String, required: true },
    todo_desc: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;