import dotenv from "dotenv";
import {
	postUser,
	getUserByEmail,
	verifyPass,
} from "../services/auth.service.js";
import jwt from "jsonwebtoken";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;

export function signUp(req, res) {
	const user = req.body;
	postUser(user);
	return res.json({ status: "OK" });
}

export function signIn(req, res) {
	const { email, password } = req.body;
	const user = getUserByEmail(email);

	if (!user || !verifyPass(user, password)) {
		return res.json({
			status: "Error",
			message: "Incorrect credentials",
		});
	}

	const accessToken = jwt.sign(
		{
			email: user.email,
			role: ["admin", "dev"],
			permissions: ["read", "write"],
		},
		JWT_SECRET,
		{
			expiresIn: "15m",
		}
	);

	const refreshToken = jwt.sign(
		{
			email: user.email,
			role: ["admin", "dev"],
			permissions: ["read", "write"],
		},
		JWT_SECRET,
		{
			expiresIn: "7d",
		}
	);

	return res.json({
		status: "OK",
		accessToken,
		refreshToken,
	});
}

export function account(_, res) {
	return res.json({
		status: "OK",
		path: "My account",
	});
}

export function newAccessToken(req, res) {
	const { email, role, permissions } = req.user;
	const accessToken = jwt.sign({ email, role, permissions }, JWT_SECRET, {
		expiresIn: "15m",
	});

	return res.json({
		status: "OK",
		message: "New access token",
		accessToken,
	});
}
