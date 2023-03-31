import { Request, Response } from "express"
import { getMessageStatusCode } from "../../services/helper.service"
import ArticleService  from "../Services/ArticleService"
import * as fs from 'fs';


class ArticlesController  {
	async createArticle(request: Request, response: Response): Promise<void> {
		try {
			const article = {
				banner: request.file.path,
				title: request.body.title,
				text: request.body.text,
				user_id: request.body.user_id,
			}

			await ArticleService.createArticle(article)
			response.status(201).json({message: 'Artigo criado com sucesso'})
			
		} catch(error) {
			response.status(500).json({ message: error })
		}
	}

	async findArticlesAll(request: Request, response: Response): Promise<void> {
		try {
			const articles = await ArticleService.findArticlesAll(request.query)

			if(articles.length > 0) {
				response.status(200).json(articles)
			} else {
				response.status(404).json({message: 'Não existe artigos'})
			}

		} catch(error) {
			response.status(500).json({ message: error })
		}
	}

	async findArticleById(request: Request, response: Response): Promise<void> {
		try {
			const article = await ArticleService.findArticleById(request.params.id)

			if(article) {
				response.status(200).json(article)
			} else {
				response.status(404).json({ message: 'Artigo não encontrado'})
			}
			
		} catch(error) {
			response.status(500).json({ message: error })
		}
	}

	async updateArticleById(request: Request, response: Response): Promise<void> {
		try {
			const id = Number(request.params.id)
			const payload = {
				banner: request.file.path,
				title: request.body.title,
				text: request.body.text,
			}
			
			const oldImage = request.body.oldImage
			fs.unlink(oldImage, (error) => {
				if(error) {
					console.log(error);
				} else {
					console.log('imagem trocada')
				}
			});

			const article = await ArticleService.updateArticleById(id, payload)

			if(article) {
				response.status(200).json({message: 'Informações atualizado com sucesso'})
			} else {
				response.status(404).json({ message: getMessageStatusCode(404) })
			}
		} catch(error) {
			response.status(500).json({ message: error })
		}
	}

	async deleteArticleById(request: Request, response: Response): Promise<void> {
		try {
			const article = await ArticleService.deleteArticleById(request.params.id)
			
			if(article) {
				response.status(200).json({ message: 'Artigo deletado com sucesso' })
			}

		} catch(error) {
			response.status(500).json({ message: error })
		}
	}
}

export default new ArticlesController()