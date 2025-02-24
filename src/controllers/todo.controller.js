import {
	getAllTodos,
	postTodo,
	getTodoById,
	updateTodoById,
	deleteTodoById,
} from "../services/todo.service.js";

export function getTodos(req, res) {
	return res.json({
		list: getAllTodos(),
	});
}

export function getTodo(req, res) {
	const id = parseInt(req.params.id);
	const todo = getTodoById(id);
	return res.json(todo);
}

export function createTodo(req, res) {
	const { description, status } = req.body;
	const todo = {
		id: Date.now(),
		description,
		status,
	};
	postTodo(todo);
	return res.status(201).json({ message: "Todo created", todo });
}

export function updateTodo(req, res) {
	const id = parseInt(req.params.id);
	const { description, status } = req.body;
	const updatedTodo = updateTodoById(id, { description, status });

	return res
		.status(200)
		.json({ message: `Todo ${id} updated`, todo: updatedTodo });
}

export function deleteTodo(req, res) {
	const id = parseInt(req.params.id);
	deleteTodoById(id);
	return res.status(200).json({ message: `Todo ${id} deleted` });
}
