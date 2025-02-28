import { Router } from "express";

import {
	loginValidator,
	registrationValidator,
} from "../validators/jwt.validator.js";
import {
	signUp,
	signIn,
	account,
	newAccessToken,
} from "../controllers/jwt.controller.js";
import {
	jwtMiddleware,
	refreshTokenMiddleware,
} from "../middleware/jwtAuth.js";

export const jwtRouter = Router();

jwtRouter.get("/account", jwtMiddleware, account);
jwtRouter.post("/register", registrationValidator, signUp);
jwtRouter.post("/login", loginValidator, signIn);
jwtRouter.post("/new-access-token", refreshTokenMiddleware, newAccessToken);
