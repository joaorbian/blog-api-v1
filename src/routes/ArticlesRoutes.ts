import { Router } from "express";

import ArticlesController from "../app/Controllers/ArticlesController";
import Validate from "../app/middlewares/middleware";
import upload from "../app/middlewares/multer";
import ArticleRepository from "../app/Repositories/ArticleRepository";
import UserRepository from "../app/Repositories/UserRepository";
import {ArticleService }from "../app/Services/ArticleService";

const ArticlesRouter: Router = Router()

const validate = new Validate()
const articleRepository = new ArticleRepository();
const userRepository = new UserRepository();
const articleService = new ArticleService(articleRepository, userRepository);
const articlesController = new ArticlesController(articleService)

// ArticlesRouter.post('/create-article', validate.validateToken, (req, res) =>  articlesController.createArticle(req, res))

// ArticlesRouter.get('/articles', validate.validateToken, (req, res) =>  articlesController.findArticlesAll(req, res))

// ArticlesRouter.get('/article/:id', validate.validateToken, (req, res) =>  articlesController.findArticleById(req, res))

// ArticlesRouter.put('/article/edit/:id', validate.validateToken, (req, res) =>  articlesController.updateArticleById(req, res))

// ArticlesRouter.delete('/article/delete/:id', validate.validateToken, (req, res) =>  articlesController.deleteArticleById(req, res))

ArticlesRouter.post('/create-article', upload.single("file"), (req, res) =>  articlesController.createArticle(req, res))

ArticlesRouter.get('/articles', (req, res) =>  articlesController.findArticlesAll(req, res))

ArticlesRouter.get('/article/:id', (req, res) =>  articlesController.findArticleById(req, res))

ArticlesRouter.put('/article/edit/:id', (req, res) =>  articlesController.updateArticleById(req, res))

ArticlesRouter.delete('/article/delete/:id', (req, res) =>  articlesController.deleteArticleById(req, res))

export { ArticlesRouter }