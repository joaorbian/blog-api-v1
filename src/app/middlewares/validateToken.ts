import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getMessageStatusCode } from "../../services/helper.service";

class Validate {
	validateToken(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			res.status(404).json({ message: getMessageStatusCode(401) });
		}

		const token = authHeader.split(" ")[1];
		const tokenValid = jwt.verify(token, "my-secret-key");

		if (tokenValid) {
			next();
		} else {
			res.status(404).json({ message: getMessageStatusCode(401) });
		}
	}
}

export default new Validate();
