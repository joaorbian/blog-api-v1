import { Request, Response } from "express";


export default class ArticlesController {
	static async getAll(request: Request, response: Response) {
		return response.send('Rota liberada')
	}

}
