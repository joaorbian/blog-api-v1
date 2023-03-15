import { Request, Response, Router } from "express";
import AuthService from "../app/Auth/AuthService";

const router: Router = Router()

router.post('/users/create', (req: Request, res: Response) => {
	const user = req.body
	const userCreated = AuthService.register(user)

	return res.status(201).json(userCreated)
})

router.post('/auth/login', (req: Request, res: Response) => {
	const { username, email, password} = req.body

	const userCreated = AuthService.login(email, password)

	return res.status(201).json(userCreated)
})

export { router }