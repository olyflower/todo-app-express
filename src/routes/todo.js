import { Router } from "express";

export const todoRouter = Router();

let data = [
	{ id: 1, description: "description1", status: "done" },
	{ id: 2, description: "description2", status: "new" },
	{ id: 3, description: "description3", status: "done" },
	{ id: 4, description: "description4", status: "new" },
];

// get all, post
todoRouter
	.route("/")
	.get((req, res) => {
		res.json(data);
	})

	.post((req, res) => {
		const todo = req.body;
		data.push({ ...todo });
		res.status(201).json({ message: "Todo created", data });
	});

// get id
todoRouter.get("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const todo = data.find((item) => item.id === id);
	if (todo) {
		res.json(todo);
	} else {
		res.status(404).send(`Todo ${id} not found`);
	}
});

// put id
todoRouter.put("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const updatedTodo = req.body;
	const index = data.findIndex((item) => item.id === id);

	if (index === -1) {
		return res.status(404).send(`Todo ${id} not found`);
	}
	data[index] = { id, ...updatedTodo };

	res.status(200).json({ message: `Todo ${id} updated`, updatedTodo });
});

// delete id
todoRouter.delete("/:id", (req, res) => {
	const id = parseInt(req.params.id);

	const index = data.findIndex((item) => item.id === id);
	if (index === -1) {
		return res.status(404).send(`Todo ${id} not found`);
	}

	data.splice(index, 1);
	res.status(200).json({ message: `Todo ${id} deleted`, data });
});
