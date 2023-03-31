import { Request, Response } from "express"
import { getMessageStatusCode } from "../../services/helper.service"
import UserService from "../Services/UserService"
import AuthMicroServices from "../AWS/AuthMicroServices"

class UsersController {
	public async register(request: Request, response: Response): Promise<void> {
		try {
			const user = await AuthMicroServices.register(request.body)
			response.status(201).json(user)
		} catch (err) {
			console.error(err)
			response.status(500).json({ message: getMessageStatusCode(500) })
		}
	}

	public async login(request: Request, response: Response): Promise<void> {
		try {
			const user = await AuthMicroServices.login( request.body.email, request.body.password )
			response.status(200).json(user)
		} catch (err) {
			console.error(err)
			response.status(401).json({ message: "Invalid credentials" })
		}
	}

	public async findUsers(request: Request, response: Response): Promise<void> {
		try {
			const users = await UserService.findUsers(request.query)
			response.status(200).json(users)
		} catch (err) {
			console.error(err)
			response.status(500).json({ message: getMessageStatusCode(500) })
		}
	}

	public async findUserById(request: Request, response: Response): Promise<void> {
		try {
			const user = await UserService.findUserById(request.params.id)
			if (user) {
				response.status(200).json(user)
			} else {
				response.status(404).json({ message: getMessageStatusCode(404) })
			}
		} catch (err) {
			console.error(err)
			response.status(500).json({ message: getMessageStatusCode(500) })
		}
	}

	public async updateUser(request: Request, response: Response): Promise<void> {
		try {
			const id = request.params.id
			const name = request.body.name
			const username = request.body.username
			const email = request.body.email

			const user = await UserService.updateUser(id, name, username, email)
			if (user) {
				response
					.status(200)
					.json({
						id: user.id,
						name: user.name,
						username: user.username,
						email: user.email,
					})
			} else {
				response.status(404).json({ message: getMessageStatusCode(404) })
			}
		} catch (err) {
			console.error(err)
			response.status(500).send("Error updating user")
		}
	}

	async recoveryPassword(request: Request, response: Response): Promise<void> {
		try {
			const userId = Number(request.params.id)
			const password = request.body.password

			const updatedUser = await AuthMicroServices.recoveryPassword(userId, password)
			if (updatedUser) {
				response.status(200).json({ message: "Password changed successfully" })
			} else {
				response.status(404).json({ message: getMessageStatusCode(404) })
			}
		} catch (err) {
			console.error(err)
			response.status(500).send("Error updating user")
		}
	}

	async deleteUser(request: Request, response: Response): Promise<void> {
		try {
			const user = await UserService.deleteUser(request.params.id)
			if (user) {
				response.status(200).json({ message: "User successfully deleted" })
			} else {
				response.status(404).json({ message: getMessageStatusCode(404) })
			}
		} catch (err) {
			console.error(err)
			response.status(500).json({ message: getMessageStatusCode(500) })
		}
	}
}

export default new UsersController()
