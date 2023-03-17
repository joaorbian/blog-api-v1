import AuthMicroServices from "../AWS/AuthMicroServices";
import UserService from "../Services/UsersService";
export default class UsersController {
	static async register(Request, Response) {
		const user = Request.body;
		const userCreated = await AuthMicroServices.register(user);

		if (!userCreated) {
			Response.status(404).json("Bad Request");
		} else {
			Response.status(201).json(userCreated);
		}
	}

	static async login(Request, Response) {
		const email = await Request.body.email;
		const password = await Request.body.password;
        
		const registeredUser = AuthMicroServices.validateUser(email, password);
        
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
}
