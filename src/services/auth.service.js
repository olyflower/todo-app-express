import crypto from "crypto";

const users = [];

export function getUserByEmail(email) {
	return users.find((user) => user.email === email);
}

export function verifyPass(user, password) {
	const hash = getHashByPassword(password);

	return hash === user.password;
}

export function postUser(user) {
	user["password"] = getHashByPassword(user.password);
	users.push(user);
}

function getHashByPassword(pass) {
	return crypto.createHash("md5").update(pass).digest().toString("hex");
}
