import { UserInterface } from "../Interfaces/UserInterface";
import { User } from "../Models/User";

export default class UserRepository implements UserInterface {

	constructor(
        private readonly user: UserInterface,
    ) {}

	async createUser(user: UserInterface): Promise<User | void> {
		const createUser = await this.user.createUser(user);
		console.log(createUser);

		throw new Error("Method not implemented.");
	}

	async findUserAll(): Promise<User[]> {
		const users = await this.user.findUserAll();
		return users;
	}

	async findUserById(id: number): Promise<User | null> {
		const user = await this.user.findUserById(id);
		return user;
	}

	async updateUserById(id: number): Promise<User |boolean> {
		const updatedRows = await this.user.updateUserById(id);
		return updatedRows[0] > 0;
	}

	async deleteUserById(id: number): Promise<User | boolean> {
		const deletedRows = await this.user.deleteUserById(id);
		return deletedRows[0] > 0;
	}
}
