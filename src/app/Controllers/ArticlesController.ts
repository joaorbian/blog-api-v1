import { Request, Response } from "express";
import { getMessageStatusCode } from "../../services/helper.service";
import ArticleRepository from "../Repositories/ArticleRepository";
import UserRepository from "../Repositories/UserRepository";
import { ArticleService } from "../Services/ArticleService";

export default class ArticlesController {
	_articleService: ArticleService;
	_articleRepository: ArticleRepository
	_userRepository: UserRepository;

	constructor(
		articleService: ArticleService,
		articleRepository: ArticleRepository,
		userRepository: UserRepository
		) {
		this._articleService = articleService
		this._articleRepository = articleRepository
		this._userRepository = userRepository;
		}



  async createArticle(request: Request, response: Response): Promise<void> {
	
    try {
      const articleData = {
		banner: request.body.banner,
        title: request.body.title,
        text: request.body.text,
        image: request.body.image,
        user_id: request.body.user_id
	  }

      const createdArticle = await this._articleService.createArticle(articleData);

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
			const user = await this._articleService.findArticleById(request.params.id);
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
			const user = await this._articleService.deleteArticleById(request.params.id);
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
