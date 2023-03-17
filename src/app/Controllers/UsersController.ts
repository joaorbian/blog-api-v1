import AuthMicroServices from "../AWS/AuthMicroServices";
import UserService from "../Services/UsersService";
import { Request, Response } from "express";

export default class UsersController {
	static async register(request: Request, response: Response) {
		const user = request.body;
		const userCreated = await AuthMicroServices.register(user);

		if (!userCreated) {
			response.status(404).json("Bad Request");
		} else {
			response.status(201).json(userCreated);
		}
	}

	static async login(Request, Response) {

		const { email, password } = await Request.body
		const registeredUser = await AuthMicroServices.validateUser(email, password);
		console.log(registeredUser)

		if (!registeredUser) {
			 Response.badRequest({message: "invalid_credentials"} );
		} else {
			Response.status(201).json(registeredUser);
		}
	}

	static async allUsers(users: any, Request, Response) {
	    const allUsers = await UserService.findUserAll(users)
	    return Response.send(allUsers)
	}
	// async allUsers(Request, Response) {
	//     const allUsers =
	//     return Response.send()
	// }

}
