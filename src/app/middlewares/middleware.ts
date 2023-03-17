import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
	
class Validate {
	
	validateToken(req: Request, res: Response, next: NextFunction) {
		try {
			const authHeader = req.headers.authorization;
			if (!authHeader) {
				throw new Error('Authorization header not found');
			}
	
			const token = authHeader.split(' ')[1];
			const decodedToken = jwt.verify(token, 'my-secret-key');
	
			next();
		} catch (error) {
			res.status(401).json({ message: 'Invalid token' });
		}
	}

}

export default new Validate() 