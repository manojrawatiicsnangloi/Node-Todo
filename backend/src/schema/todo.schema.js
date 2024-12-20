const yup = require("yup");

const payload = {
    body : yup.object({
        todo_title : yup.string().required("Title is required").max(120, "Title Cannot more than 120 words"),
        todo_desc : yup.string().required().max(1000, "Desc char Limit Exceeded")
    })
}

const params = {
    params : yup.object({
    _id : yup.string().required("Todo Id is required")
    })
}

const createTodoCreateSchema = yup.object().shape({
    ...payload
});

const updateTodoSchema = yup.object().shape({
    ...params,
    ...payload
});

const deletePostSchema = yup.object().shape({
    ...params
});

module.exports = {
    createTodoCreateSchema, updateTodoSchema, deletePostSchema  
}