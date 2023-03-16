import { Router } from "express";
import UsersController from "../app/Controllers/UsersController";

const router: Router = Router()

router.post('/auth/register', UsersController.register) 

router.post('/auth/login', UsersController.login)

export { router }