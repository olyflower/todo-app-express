import { Router } from "express";

const data = [
	{ id: 1, description: "description1", status: "done" },
	{ id: 2, description: "description2", status: "new" },
	{ id: 3, description: "description3", status: "done" },
	{ id: 4, description: "description4", status: "new" },
];

export const viewRouter = Router();

viewRouter.get("/", (req, res) => {
	res.render("index", { title: "Home",  todos: data  });
});

viewRouter.get("/about", (req, res) => {
	res.render("index", { title: "About",  todos: data  });
});
