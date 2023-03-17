import AuthMicroServices from "../AWS/AuthMicroServices";
import { Request, Response } from "express";
import { getMessageStatusCode } from "../../services/helper.service";

export default class UsersController {
	static async register(request: Request, response: Response) {
		const user = request.body;
		const userCreated = await AuthMicroServices.register(user);

		if (!userCreated) {
			response.status(404).json({msg: getMessageStatusCode(404)});
		} else {
			response.status(201).json({msg: getMessageStatusCode(201)});
		}
	}

	static async login(request: Request, response: Response) {

		const { email, password } = await request.body
		const token = await AuthMicroServices.validateUser(email, password);

		response.status(201).json({token});
	}

}
