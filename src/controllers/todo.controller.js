import {
	getAllTodos,
	postTodo,
	getTodoById,
	updateTodoById,
	deleteTodoById,
} from "../services/todo.service.js";

// export function getTodos(_, res) {
// 	return res.json({
// 		list: getAllTodos(),
// 	});
// }

// export function getTodo(req, res) {
// 	const id = parseInt(req.params.id);
// 	const todo = getTodoById(id);
// 	return res.json(todo);
// }

// export function createTodo(req, res) {
// 	const { description, status } = req.body;
// 	const todo = {
// 		id: Date.now(),
// 		description,
// 		status,
// 	};
// 	postTodo(todo);
// 	return res.status(201).json({ message: "Todo created", todo });
// }

// export function updateTodo(req, res) {
// 	const id = parseInt(req.params.id);
// 	const { description, status } = req.body;
// 	const updatedTodo = updateTodoById(id, { description, status });

// 	return res
// 		.status(200)
// 		.json({ message: `Todo ${id} updated`, todo: updatedTodo });
// }

// export function deleteTodo(req, res) {
// 	const id = parseInt(req.params.id);
// 	deleteTodoById(id);
// 	return res.status(200).json({ message: `Todo ${id} deleted` });
// }

export async function getTodos(req, res) {
	try {
		const todos = await getAllTodos();
		return res.json({ list: todos });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error fetching todos" });
	}
}

export async function getTodo(req, res) {
	const id = parseInt(req.params.id);
	try {
		const todo = await getTodoById(id);
		if (todo) {
			return res.json(todo);
		}
		return res
			.status(404)
			.json({ message: `Todo with ID ${id} not found` });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error fetching todo" });
	}
}

export async function createTodo(req, res) {
	const { description, status } = req.body;
	try {
		const newTodo = await postTodo({ description, status });
		return res.status(201).json({ message: "Todo created", todo: newTodo });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error creating todo" });
	}
}

export async function updateTodo(req, res) {
	const id = parseInt(req.params.id);
	const { description, status } = req.body;
	try {
		const updatedTodo = await updateTodoById(id, { description, status });
		if (updatedTodo) {
			return res
				.status(200)
				.json({ message: `Todo ${id} updated`, todo: updatedTodo });
		}
		return res
			.status(404)
			.json({ message: `Todo with ID ${id} not found` });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error updating todo" });
	}
}

export async function deleteTodo(req, res) {
	const id = parseInt(req.params.id);
	try {
		const success = await deleteTodoById(id);
		if (success) {
			return res.status(200).json({ message: `Todo ${id} deleted` });
		}
		return res
			.status(404)
			.json({ message: `Todo with ID ${id} not found` });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error deleting todo" });
	}
}
