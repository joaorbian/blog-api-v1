import { Request, Response, Router } from "express";
import AuthMicroServices from "../app/AWS/AuthMicroServices";

const router: Router = Router()

router.post('/users/create', async (req: Request, res: Response) => {
	const user = req.body
	const userCreated = await AuthMicroServices.register(user)

	return res.status(201).json(userCreated)
})

router.post('/auth/login', async (req: Request, res: Response) => {
	const { email, password} = req.body
	const userValidated = await AuthMicroServices.validateUser(email, password)

	return res.status(201).json(userValidated)
})

export { router }