import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../controllers/jwt.controller.js";

export const jwtMiddleware = (req, res, next) => {
	if (!req.headers["authorization"]) {
		return res.json({ error: "missing token" });
	}

	const token = String(req.headers["authorization"]).split(" ")[1];

	try {
		const data = jwt.verify(token, JWT_SECRET);
		console.log({ data });
	} catch (err) {
		return res.json({
			status: "Error",
			err,
		});
	}

	next();
};

export const refreshTokenMiddleware = (req, res, next) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(401).json({ status: "Error", message: "Refresh token is required in request body!" });
	}

	try {
		const decoded = jwt.verify(refreshToken, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		return res.json({
			status: "Error",
			err,
		});
	}
};
