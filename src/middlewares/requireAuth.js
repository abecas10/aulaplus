import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const requireAuth = (redirect = false) => {
	return async (req, res, next) => {
		const {authorization} = req.headers;
		try {
			const data = jwt.verify(authorization, process.env["JWT_SECRET"]);
			const user = await UserModel.getUserByUsername(data["username"]);
			if (!user) {
				if (redirect) return res.redirect("/");
				return res.status(401).json({error: "the token is invalid"});
			}
			req.username = user.username;
			return next();
		} catch (error) {
			if (redirect) return res.redirect("/");
			return res.status(401).json({error: "request is not authorized"});
		}
	};
};

export default requireAuth;

/*

express.json {
	req -> json
	next() -> morgan
}

datos -> express.json -> morgan -> requireAuth -> crearPost

*/
