import UserRepository from "../Repositories/UserRepository";

export default class UserService {
	_userRepository: UserRepository;    

  constructor(userRepository: UserRepository) { 
	this._userRepository = userRepository
	} 

  async findUserById(userId) {
    const user = await this._userRepository.findUserById(userId);
    return user;
  }

  async findUsersAll(users) {
    const allUser = await this._userRepository.findUsersAll(users);
    return allUser;
  }

  async updateUserById(userId, userData) {
    const updatedUser = await this._userRepository.updateUserById(userId, userData);
    return updatedUser;
  }

  async deleteUserById(userId) {
    const deletedUser = await this._userRepository.deleteUserById(userId);
    return deletedUser;
  }
}
