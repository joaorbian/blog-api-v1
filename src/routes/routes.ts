import { response, Router } from "express";

const router: Router = Router()

router.get('/users', (request, response) => {
	const users: any = [
		{
			name: "Conta Master",
			username: "masteraccount",
			email: "masteraccount@gmail.com",
			password: "senhaBoba123"
		},
	]

	console.log(users)
	response.send(users)
})

export { router }