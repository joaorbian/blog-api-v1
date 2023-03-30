import UserRepository from "../Repositories/UserRepository";

class UserService {

	public async findUserById(userId) {
		const user = await UserRepository.findUserById(userId);
		return user;
	}


	public async findUsers(users) {
		const allUser = await UserRepository.findUsers(users);
		return allUser;
	}


	public async updateUser(id, name, username, email) {
		const updatedUser = await UserRepository.updateUser(id, {
			name: name,
			username: username,
			email: email,
		});
		return updatedUser;
	}


	public async deleteUser(userId) {
		const deletedUser = await UserRepository.deleteUserById(userId);
		return deletedUser;
	}
}


export default new UserService();
