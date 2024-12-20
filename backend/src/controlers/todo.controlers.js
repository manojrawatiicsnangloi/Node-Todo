const { get } = require("lodash");
const {
  createTodoFunc,
  updateTodoFunc,
  findTodoFunc,
  findOneTodoFunc,
  deleteTodoFunc,
} = require("../services/todo.service");

const addTodoHandler = async (req, res) => {
  const user_id = get(req, "user._id");
  const body = get(req, "body");
  const todo = await createTodoFunc({ ...body, user: user_id });
  res.status(200).json({ message: "User Created Successfully" });
};

const updateTodoHandler = async (req, res) => {
  const user_id = get(req, "user._id");
  const todo_id = get(req, "params.todo_id");
  const body = get(req, "body");
  const todo = findOneTodoFunc({ _id: todo_id });
  if (!todo) {
    res.status(400).json({ error: "Todo Not Found" });
  }
  if (todo.user != user_id) {
    res.status(401).json({ error: "Unauthorized User" });
  }
  const updateTodo = await updateTodoFunc({ _id: todo_id }, body, {
    new: true,
  });
  res.status(200).json({ message: "Todo List Updated Successfully!!" });
};

const getUserTodoHandler = async (req, res) => {
  const user_id = get(req, "user._id");
  const todo_list = await findTodoFunc({ user: user_id }, {lean : false});
  return res.status(200).json(todo_list);
};

const deleteTodoHandler = async (req, res) => {
  try {
    const userId = get(req, "user._id");
    const todoId = get(req, "params._id");
    const todo = await findOneTodoFunc({ _id: todoId }, { lean: false });
    if (!todo) {
      return res.status(400).json({ error: "Not Found" });
    }
    if (todo.user != userId) {
      return res.status(401).json({ error: "Un Authorize User" });
    }
    await deleteTodoFunc({ _id: todoId });
    return res.status(200).json({"message": "Todo Deleted Successfully!!"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTodoHandler,
  updateTodoHandler,
  getUserTodoHandler,
  deleteTodoHandler,
};
