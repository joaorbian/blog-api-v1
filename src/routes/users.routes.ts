import { Router } from "express";

import UsersController from "../app/Controllers/UsersController";
import Validate from "../app/middlewares/validateToken"

const usersRouter: Router = Router()

usersRouter.post('/auth/register', UsersController.register);
usersRouter.post('/auth/login', UsersController.login);
usersRouter.get('/users', Validate.validateToken,UsersController.findUsers);
usersRouter.get('/user/:id', Validate.validateToken, UsersController.findUserById);
usersRouter.put('/user/edit/:id',  Validate.validateToken, UsersController.updateUser);
usersRouter.put('/user/recovery-password/:id', Validate.validateToken, UsersController.recoveryPassword);
usersRouter.delete('/user/delete/:id', Validate.validateToken, UsersController.deleteUser);

usersRouter.get('/get-user/:id', UsersController.findUserById);

export { usersRouter }