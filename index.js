import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { todoRouter } from "./src/routes/todo.js";
import { authRouter } from "./src/routes/auth.js";
import { jwtRouter } from "./src/routes/jwt.js";
import session from "express-session";

const app = express();
const APP_PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src/views"));

app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

app.use("/api/todos", todoRouter);
app.use("/auth", authRouter);
app.use("/jwt", jwtRouter)

app.listen(APP_PORT, () => {
	console.log(`Express server is listening on port ${APP_PORT}`);
});
