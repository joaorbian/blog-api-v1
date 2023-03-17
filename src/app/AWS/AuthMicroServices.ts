import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { json } from 'sequelize';
interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

class AuthMicroServices {
  public users: User[] = [];
	public token: any

  public async register(user: User) {
    if (this.users.some(u => u.email === user.email || u.username === user.username)) {
      throw new Error('E-mail or name already exists'); 
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

		const newUser: User = {
      ...user,
      password: hashedPassword,
    }

    this.users.push(newUser);
		return json('User create with success')
  }

  public async validateUser(email: string, password: string) {
    const user = this.users.find(u => u.email === email);

		if(!user) {
			throw new Error('User not found')
		}

		const passwordMatch = await bcrypt.compare(password, user.password)
		if(!passwordMatch) {
			throw new Error('Incorrect password')
		}

		const token = jwt.sign({ userId: user.name }, 'my-secret-key', { expiresIn: '1h' });
		this.token = token
	  return { token }
  }

}

export default new AuthMicroServices()