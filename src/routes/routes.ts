import { response, Router } from "express";

const router: Router = Router()

router.get('/', (request, response) => {
	const users: any = [
		{
			name: 'joao',
			age: 24,
			job: 'developer'
		},
	]

	console.log(users)
	return response.send(users)
})

export { router }