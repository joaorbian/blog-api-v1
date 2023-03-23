import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getMessageStatusCode } from "../../services/helper.service";
import { User } from "../Models/User";
import UserRepository from "../Repositories/UserRepository";

interface user {
	name: string;
	username: string;
	email: string;
	password: string;
}

interface IAuthMicroServices {
	register(user: User): Promise<boolean>;
	login(email: string, password: string): Promise<string | number>;
}

export default class AuthMicroServices implements IAuthMicroServices {
	private _userRepository: UserRepository;
	public token: string;

	constructor(userRepository: UserRepository) {
		this._userRepository = userRepository;
	}

	public async register(user: User): Promise<boolean> {
		const userExists = await this._userRepository.findByEmailOrUsername(user);

		if (userExists) {
			let userExistDb: any = { message: "This user is already registered" };
			return userExistDb;
		} else {
			const hashedPassword = await bcrypt.hash(user.password, 10);

			const newUser = {
				...user,
				password: hashedPassword,
			};

			const createUserSucess = await this._userRepository.createUser(newUser);

			return createUserSucess;
		}
	}

	public async login(email: string, password: string) {
		if (!email) {
		  throw new Error("Email is required.");
		}
		if (!password) {
		  throw new Error("Password is required.");
		}

		const user = await this._userRepository.findByEmailOrPassword({ email, password });

		if (!user) {
		  return getMessageStatusCode(401);
		}
	  
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
		  return getMessageStatusCode(401);
		}
	  
		const token = jwt.sign({ userId: user.id }, "my-secret-key", {
		  expiresIn: "1h",
		});
	  
		return { token };
	}
	  
}
