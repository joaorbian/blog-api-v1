import UserRepository from "../Repositories/UserRepositoy";

export default class UserService {
	async createUser(user: any): Promise<any> {
		const createUser = await UserRepository.createUser(user);

		if (!createUser) {
			throw new Error("E-mail or name already exists");
		}

		return createUser;
	}

	async findUserAll(users: any): Promise<any> {
		const allUsers = await UserRepository.findUserAll(users);
		return allUsers;
	}

	async findUserById(id: number): Promise<any | boolean> {
		const findUserById = await UserRepository.findUserById(id);

		if (!findUserById) {
			throw new Error("User not found in the database");
		}

		return findUserById;
	}

	async updateUserById(id: number, users: any): Promise<any> {
		const allUsers = await UserRepository.findUserAll(users);
		const userId = await UserRepository.updateUserById(id);

		const user = allUsers.find((user) => Number(user.id) === Number(userId));

		if (!user) {
			throw new Error("User not found in the database");
		} else {
			const updatedUser = {
				...user,
				name: user.name,
				username: user.username,
				email: user.email,
				password: user.password,
			};

			users = users.map((user) => {
				if (Number(user.id) === Number(userId)) {
					user = updatedUser;
				}
				return user;
			});
		}
	}

	async deleteUserById(id: number, user: any): Promise<any> {
		const deleteuserById = await UserRepository.deleteUserById(id, user);

		if (!deleteuserById) {
			throw new Error("User not found in the database");
		}
		return deleteuserById;
	}
}
