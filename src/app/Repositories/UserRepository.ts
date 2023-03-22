import { UserInterface } from "../Interfaces/UserInterface";
import { User } from "../Models/User";

export default class UserRepository implements UserInterface {

  async createUser(userData: any): Promise<any> {
    const user = await User.create(userData);
    return user.toJSON();
  }


  async findUsersAll(users: any): Promise<User[]> {
		const allUsers = await User.findAll(users);
		return allUsers;
	}

  async findUserById(userId: number): Promise<any> {
    const user = await User.findByPk(userId);
    return user && user.toJSON();
  }
  
  async findByEmailOrUsername(user: any): Promise<any> {
	const emailResult = await User.findAll({ where: { email: user.email } });
	const usernameResult = await User.findAll({ where: { username: user.username } });
  
	const emailUser = emailResult.length > 0 ? emailResult[0].toJSON() : null;
	const usernameUser = usernameResult.length > 0 ? usernameResult[0].toJSON() : null;
  
	return emailUser || usernameUser;
  }

  async findByEmailOrPassword(user: { email?: string; password?: string }): Promise<any> {
    if (!user.email && !user.password) {
      throw new Error("Email or password is required.");
    }
  }


  async updateUserById(userId: string, userData: any): Promise<any> {
    const user = await User.findByPk(userId);
    if (!user) {
      return null;
    }
    const updatedUser = await user.update(userData);
    return updatedUser.toJSON();
  }

  async deleteUserById(userId: string): Promise<any> {
    const user = await User.findByPk(userId);
    if (!user) {
      return null;
    }
    await user.destroy();
    return user.toJSON();
  }
}
