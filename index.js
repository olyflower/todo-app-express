import express from "express";
import { todoRouter } from "./src/routes/todo.js";

const app = express();
const APP_PORT = 3000;

app.use(express.json());

app.use("/api/todos", todoRouter);

app.listen(APP_PORT, () => {
	console.log(`Express server is listening on port ${APP_PORT}`);
});
