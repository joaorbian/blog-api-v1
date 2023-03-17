import { Router } from "express";
import UsersController from "../app/Controllers/UsersController";
import ArticlesController from "../app/Controllers/ArticlesController";
import Validate  from "../app/middlewares/middleware";

const router: Router = Router()

router.post('/auth/register', UsersController.register) 
router.post('/auth/login', UsersController.login)
router.get('/articles', Validate.validateToken , ArticlesController.getAll)


export { router }