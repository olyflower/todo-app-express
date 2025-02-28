export const sessionMiddleware = (req, res, next) => {
	const { user } = req.session;

	console.log({ session: req.session });

	if (!user) {
		res.redirect("/auth/login");
	}

	next();
};
