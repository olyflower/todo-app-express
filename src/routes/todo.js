import { Router } from "express";
import {
	getTodos,
	getTodo,
	createTodo,
	updateTodo,
	deleteTodo,
} from "../controllers/todo.controller.js";
import {
	createTodoValidator,
	idExistsValidator,
} from "../validators/todo.validator.js";

export const todoRouter = Router();

todoRouter.get("/", getTodos);
todoRouter.get("/:id", idExistsValidator, getTodo);
todoRouter.post("/", createTodoValidator, createTodo);
todoRouter.put("/:id", idExistsValidator, createTodoValidator, updateTodo);
todoRouter.delete("/:id", idExistsValidator, deleteTodo);
