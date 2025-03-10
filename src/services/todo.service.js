import Todo from "../models/todo.model.js";

// const todos = [
// 	{ id: 1, description: "description1", status: "done" },
// 	{ id: 2, description: "description2", status: "new" },
// 	{ id: 3, description: "description3", status: "done" },
// 	{ id: 4, description: "description4", status: "new" },
// ];

// export function getAllTodos() {
// 	return todos;
// }

// export function getTodoById(id) {
// 	const todo = todos.find((todo) => todo.id === parseInt(id));
// 	return todo;
// }

// export function postTodo(todo) {
// 	todos.push(todo);
// 	return todo;
// }

// export function updateTodoById(id, updatedTodo) {
// 	const todo = getTodoById(id);
// 	Object.assign(todo, updatedTodo);
// 	return todo;
// }

// export function deleteTodoById(id) {
// 	const index = todos.findIndex((todo) => todo.id === parseInt(id));
// 	todos.splice(index, 1);
// 	return true;
// }

export async function getAllTodos() {
	return await Todo.findAll(); 
}

export async function getTodoById(id) {
	return await Todo.findByPk(id);
}

export async function postTodo(todo) {
	return await Todo.create(todo);
}

export async function updateTodoById(id, updatedTodo) {
	const todo = await Todo.findByPk(id);
	if (todo) {
		return await todo.update(updatedTodo);
	}
	return null;
}

export async function deleteTodoById(id) {
	const todo = await Todo.findByPk(id);
	if (todo) {
		await todo.destroy();
		return true;
	}
	return false;
}
