import { Router } from "express";

import ArticlesController from "../app/Controllers/ArticlesController";
import Validate from "../app/Middlewares/Middleware";
import ArticleRepository from "../app/Repositories/ArticleRepository";
import UserRepository from "../app/Repositories/UserRepository";
import {ArticleService }from "../app/Services/ArticleService";

const ArticlesRouter: Router = Router()

const validate = new Validate()
const articleRepository = new ArticleRepository();
const userRepository = new UserRepository();
const articleService = new ArticleService(articleRepository, userRepository);
const articlesController = new ArticlesController(articleService, articleRepository, userRepository )

ArticlesRouter.post('/create-article', (req, res) =>  articlesController.createArticle(req, res))

ArticlesRouter.get('/articles', validate.validateToken, (req, res) =>  articlesController.findArticlesAll(req, res))

// ArticlesRouter.get('/article/:id', validate.validateToken, (req, res) =>  articlesController(req, res))

// ArticlesRouter.put('/articles/edit/:id', validate.validateToken, (req, res) =>  articlesController(req, res))

// ArticlesRouter.delete('/articles/delete/:id', validate.validateToken, (req, res) =>  articlesController(req, res))


export { ArticlesRouter }