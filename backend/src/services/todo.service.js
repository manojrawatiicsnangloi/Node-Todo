const Todo = require("../model/todo.models");

const findOneTodoFunc = (query, option = {lean : true})=>{
    return Todo.findOne(query, option);
}

const findTodoFunc = (query , option = {lean : true})=>{
    return Todo.find(query, option);
}

const createTodoFunc = (todoObj)=>{
    return Todo.create(todoObj);
}

const updateTodoFunc = (query, update, option)=>{
    return Todo.findOneAndUpdate(query, update, option);
}

const deleteTodoFunc = (query)=>{
    return Todo.deleteOne(query);
}

module.exports = {
    findTodoFunc, createTodoFunc, updateTodoFunc, deleteTodoFunc, findOneTodoFunc
}