import { Router } from "express"

import ArticlesController from "../app/Controllers/ArticlesController"
import Validate from "../app/Middlewares/validateToken"
import upload from "../app/middlewares/multer"

const articlesRouter: Router = Router()

articlesRouter.post('/create-article', Validate.validateToken, upload.single("file"), ArticlesController.createArticle)
articlesRouter.get('/articles', Validate.validateToken, ArticlesController.findArticlesAll)
articlesRouter.get('/article/:id', Validate.validateToken, ArticlesController.findArticleById)
articlesRouter.put('/article/edit/:id', Validate.validateToken, ArticlesController.updateArticleById)
articlesRouter.delete('/article/delete/:id', Validate.validateToken, ArticlesController.deleteArticleById)

export { articlesRouter }