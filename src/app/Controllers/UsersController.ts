import { Request, Response } from "express";
import { getMessageStatusCode } from "../../services/helper.service";
import UserService from "../Services/UserService";
import AuthMicroServices from "../AWS/AuthMicroServices";

export default class UsersController {
	_articleService: UserService;
	_authMicroService: AuthMicroServices;

	constructor(userService: UserService, authMicroServices: AuthMicroServices) {
		(this._articleService = userService),
			(this._authMicroService = authMicroServices);
	}

	async register(request: Request, response: Response): Promise<void> {
		try {
			const user = await this._authMicroService.register(request.body);
			response.status(201).json(user);
		} catch (err) {
			console.error(err);
			response.status(500).json({ message: getMessageStatusCode(500) });
		}
	}

	async login(request: Request, response: Response): Promise<void> {
		try {
			const token = await this._authMicroService.login(
				request.body.email,
				request.body.password
			);
			response.status(200).json({ token });
		} catch (err) {
			console.error(err);
			response.status(401).json({ message: "Invalid credentials" });
		}
	}

	async findUsersAll(request: Request, response: Response): Promise<void> {
		try {
			const users = await this._articleService.findUsersAll(request.query);
			response.status(200).json(users);
		} catch (err) {
			console.error(err);
			response.status(500).json({ message: getMessageStatusCode(500) });
		}
	}

	async findUserById(request: Request, response: Response): Promise<void> {
		try {
			const user = await this._articleService.findUserById(request.params.id);
			if (user) {
				response.status(200).json(user);
			} else {
				response.status(404).json({ message: getMessageStatusCode(404) });
			}
		} catch (err) {
			console.error(err);
			response.status(500).json({ message: getMessageStatusCode(500) });
		}
	}

	async updateUserById(request: Request, response: Response): Promise<void> {
		try {
			const user = await this._articleService.updateUserById(
				request.params.id,
				request.body
			);
			if (user) {
				response.status(200).json(user);
			} else {
				response.status(404).json({ message: getMessageStatusCode(404) });
			}
		} catch (err) {
			console.error(err);
			response.status(500).send("Error updating user");
		}
	}

	async deleteUserById(request: Request, response: Response): Promise<void> {
		try {
			const user = await this._articleService.deleteUserById(request.params.id);
			if (user) {
				response.status(200).json({ message: "User successfully deleted" });
			} else {
				response.status(404).json({ message: getMessageStatusCode(404) });
			}
		} catch (err) {
			console.error(err);
			response.status(500).json({ message: getMessageStatusCode(500) });
		}
	}
}
