import { User } from "../Models/User";

export interface UserInterface {
	createUser(user: User): Promise<User>;
	findUsers(filters: any): Promise<User[]>;
	findByEmailOrUsername(user: User): Promise<User>;
	findByEmailOrPassword(user: User): Promise<User>;
	findUserById(id: number): Promise<User>;
	updateUser(id: number, data: Partial<User>): Promise<User>;
	recoveryPassword(id: number, data: Partial<User>): Promise<User>;
	deleteUserById(id: number): Promise<void>;
}
