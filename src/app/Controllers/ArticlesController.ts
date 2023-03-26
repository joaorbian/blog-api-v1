import { Request, Response } from "express";
import { getMessageStatusCode } from "../../services/helper.service";
import { ArticleService } from "../Services/ArticleService";
import multer from "multer";

export default class ArticlesController {
	constructor(private readonly _articleService: ArticleService) {}

	async createArticle(request: Request, response: Response): Promise<void> {
		try {
			const articleData = {
				banner: request.body.banner,
				title: request.body.title,
				text: request.body.text,
				user_id: request.body.user_id,
			};

			const createdArticle = await this._articleService.createArticle(
				articleData
			);

			response.status(200).json(createdArticle);
		} catch (err) {
			console.error(err);
			response.status(500).json({ message: "Internal server error" });
		}
	}

	async findArticlesAll(request: Request, response: Response): Promise<void> {
		try {
			const users = await this._articleService.findArticlesAll(request.query);
			response.status(200).json(users);
		} catch (err) {
			console.error(err);
			response.status(500).json({ message: getMessageStatusCode(500) });
		}
	}

	async findArticleById(request: Request, response: Response): Promise<void> {
		try {
			const user = await this._articleService.findArticleById(
				request.params.id
			);
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

	async updateArticleById(request: Request, response: Response): Promise<void> {
		try {
			const user = await this._articleService.updateArticleById(
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

	async deleteArticleById(request: Request, response: Response): Promise<void> {
		try {
			const user = await this._articleService.deleteArticleById(
				request.params.id
			);
			if (user) {
				response.status(200).json({ message: "Article successfully deleted" });
			} else {
				response.status(404).json({ message: getMessageStatusCode(404) });
			}
		} catch (err) {
			console.error(err);
			response.status(500).json({ message: getMessageStatusCode(500) });
		}
	}
}
