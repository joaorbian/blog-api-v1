import { UserInterface } from "../Interfaces/UserInterface";
import { User } from "../Models/User";
class UserRepository implements UserInterface {
	
  async createUser(userData: any): Promise<any> {
		const user = await User.create(userData);
		return user.toJSON();
	}

	async findUsers(users: any): Promise<User[]> {
		const allUsers = await User.findAll(users);
		return allUsers;
	}

	async findUserById(userId: number): Promise<any> {
		const user = await User.findByPk(userId);
		return user && user.toJSON();
	}

	async findByEmailOrUsername(user: any): Promise<any> {
		const emailResult = await User.findAll({ where: { email: user.email } });
		const usernameResult = await User.findAll({
			where: { username: user.username },
		});

		const emailUser = emailResult.length > 0 ? emailResult[0].toJSON() : null;
		const usernameUser =
			usernameResult.length > 0 ? usernameResult[0].toJSON() : null;

		return emailUser || usernameUser;
	}

	async findByEmail(user: any): Promise<any> {
		const emailResult = await User.findAll({ where: { email: user.email } });

		const emailUser = emailResult.length > 0 ? emailResult[0].toJSON() : null;

		return emailUser;
	}

	async findByEmailOrPassword(user: { email?: string; password?: string }): Promise<any> {
		if (!user.email && !user.password) {
			throw new Error("Email or password is required.");
		}
		const result = await User.findOne({ where: { email: user.email } });
		return result;
	}

	async updateUser(id: number, data: Partial<User>): Promise<User> {
		const user = await User.findByPk(id);
		if (!user) {
			return null;
		}

		const newUser = {
			...data,
		};

		const updatedUser = await user.update(newUser);
		return updatedUser.toJSON();
	}

	public async recoveryPassword(
		id: number,
		data: Partial<User>
	): Promise<User> {
		const user = await User.findByPk(id);
		if (!user) {
			throw new Error(`User not found with id ${id}`);
		}

		const updatedUser = await user.update(data);
		return updatedUser;
	}

	async deleteUserById(id: number): Promise<any> {
		const user = await User.findByPk(id);
		if (!user) {
			return null;
		}
		await user.destroy();
		return user.toJSON();
	}
}

export default new UserRepository();
