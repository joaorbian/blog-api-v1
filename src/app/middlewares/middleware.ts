import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getMessageStatusCode } from '../../services/helper.service';
import AuthMicroServices from '../AWS/AuthMicroServices';

class Validate {
	
	validateToken(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			res.status(404).json(getMessageStatusCode(404))
		}
		
		const token = authHeader.split(' ')[1];

		if(jwt.verify(token, 'my-secret-key')) {
			next();
		} else {
			res.status(401).json(getMessageStatusCode(401))
		}
	}

}

export default new Validate() 