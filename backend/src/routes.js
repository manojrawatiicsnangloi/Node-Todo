const { createUserHandler } = require("./controlers/user.controlers");
const requireUser = require("./middleware/requireUser");
const validateRequest = require("./middleware/validateRequest");
const { userRegistrationSchema, userLoginSchema } = require("./schema/user.schema");
const { createTodoCreateSchema, deletePostSchema, updateTodoSchema } = require("./schema/todo.schema");
const { logoutUserSessionHandler, createUserSessionHandler, findUserSessionHandler } = require("./controlers/session.controlers");
const { addTodoHandler, getUserTodoHandler, deleteTodoHandler } = require("./controlers/todo.controlers");
const deserializeUser = require("./middleware/deserializerUser");

const routeFunc = (app)=>{
    app.post("/api/register/", validateRequest(userRegistrationSchema), createUserHandler)
    app.post("/api/login/", validateRequest(userLoginSchema), createUserSessionHandler)
    app.post("/api/logout/", requireUser , logoutUserSessionHandler)
    app.post("/api/session/", requireUser , findUserSessionHandler)
    app.post("/api/todo/", [requireUser, validateRequest(createTodoCreateSchema)], addTodoHandler)
    app.delete("/api/tododelete/:_id/", [requireUser, validateRequest(deletePostSchema)], deleteTodoHandler)
    app.get("/api/todoget/", requireUser, getUserTodoHandler)
}

module.exports = routeFunc;