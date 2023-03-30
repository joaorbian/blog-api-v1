import { User } from "../Models/User";
import UserRepository from "../Repositories/UserRepository";
import { getMessageStatusCode } from "../../services/helper.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IAuthMicroServices {
	register(user: User): Promise<boolean>;
	login(email: string, password: string): Promise<string | number>;
}

class AuthMicroServices implements IAuthMicroServices {
	
	public async register(user: User): Promise<boolean> {
		const userExists = await UserRepository.findByEmailOrUsername(user);

		if (userExists) {
			let userExistDb: any = { message: "This user is already registered" };
			return userExistDb;
		} else {
			const encryptedPassword = await bcrypt.hash(user.password, 10);

			const newUser = {
				...user,
				password: encryptedPassword,
			};

			const createUserSucess = await UserRepository.createUser(newUser);
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

		const user = await UserRepository.findByEmailOrPassword({
			email,
			password,
		});

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

	public async recoveryPassword(userId: number, password: string) {
		const user = await UserRepository.findUserById(userId);
		if (!user) {
			throw new Error(`User not found with id ${userId}`);
		}

		const encryptedPassword = await bcrypt.hash(password, 10);
		const updatedUser = await UserRepository.recoveryPassword(userId, {
			password: encryptedPassword,
		});

		return updatedUser;
	}
}

export default new AuthMicroServices();
