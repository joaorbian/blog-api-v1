import { Router } from "express";
import UsersController from "../app/Controllers/UsersController";
import UserService from "../app/Services/UserService";
import AuthMicroServices from "../app/AWS/AuthMicroServices";
import UserRepository from "../app/Repositories/UserRepository";

const UsersRouter: Router = Router()

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authMicroService = new AuthMicroServices(userRepository)
const usersController = new UsersController(userService, authMicroService)


UsersRouter.post('/auth/register', (req, res) => usersController.register(req, res));

UsersRouter.post('/auth/login', (req, res) => usersController.login(req, res));

UsersRouter.get('/users', (req, res) => usersController.findUsersAll(req, res));

UsersRouter.put('/user/edit/:id', (req, res) => usersController.updateUserById(req, res));

UsersRouter.delete('/user/delete/:id', (req, res) => usersController.deleteUserById(req, res));


export { UsersRouter }