import Joi from "joi";
import { getAllTodos } from "../services/todo.service.js";

export function createTodoValidator(req, res, next) {
	const todoSchema = Joi.object({
		description: Joi.string().min(5).max(30).required(),
		status: Joi.string().valid("done", "new").required(),
	});

	const { error } = todoSchema.validate(req.body, {
		allowUnknown: false,
		abortEarly: false,
	});

	if (error) {
		return res.status(400).json({
			message: "Validation errors",
			details: error.details.map((itm) => itm.message),
		});
	}
	next();
}

// export function idExistsValidator(req, res, next) {
// 	const isIdExists = (id) => !!getAllTodos().find((todo) => todo.id === parseInt(id));
// 	const { id } = req.params;
// 	if (!isIdExists(id)) {
// 		return res.status(404).json({ message: `Todo ${id} not found` });
// 	}
// 	next();
// }

export async function idExistsValidator(req, res, next) {
	const { id } = req.params;
	try {
		const todos = await getAllTodos();
		const isIdExists = todos.some((todo) => todo.id === parseInt(id));

		if (!isIdExists) {
			return res.status(404).json({ message: `Todo ${id} not found` });
		}
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Error checking todo ID" });
	}
}
