import { UserInterface } from "../Interfaces/UserInterface";
import { User } from "../Models/User";

export default class UserRepository implements UserInterface {
    static createUser: any;
    static findUserAll: any;
    static findUserById: number | any;
	static updateUserById: number | any;
	static deleteUserById: number | any;

	constructor(private readonly userInterface: UserInterface) {}

	async createUser(user: any): Promise<void | User> {
		const newUser = await this.userInterface.createUser(user);
		if (!newUser) {
			throw new Error("Unable to save this user, 500, E_UNABLE_SAVE");
		}

		console.log(newUser);
		return newUser;
	}

	async findUserAll(users: any): Promise<User[]> {
		const allUsers = await this.userInterface.findUserAll(users);
		return allUsers;
	}

	async findUserById(id: number): Promise<number | boolean> {
		const user = await this.userInterface.findUserById(id);
		return user;
	}

	async updateUserById(id: number): Promise<User | boolean> {
		const updatedRows = await this.userInterface.updateUserById(id);
		return updatedRows[0] > 0;
	}

	async deleteUserById(id: number): Promise<number | boolean> {
		const deletedRows = await this.userInterface.deleteUserById(id);
		return deletedRows[0] > 0;
	}
}
