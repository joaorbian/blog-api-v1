import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getMessageStatusCode } from '../../services/helper.service';
interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

class AuthMicroServices {
  public users: User[] = [];
	public token: string

  public async register(user: User): Promise<boolean> {
    if (this.users.some(u => u.email === user.email || u.username === user.username)) {
      return false
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

		const newUser: User = {
      ...user,
      password: hashedPassword,
    }

    this.users.push(newUser);
		return true
  }

  public async validateUser(email: string, password: string) {
    const user = this.users.find(u => u.email === email);

		if(!user) {
			return getMessageStatusCode(204)
		}

		const passwordMatch = await bcrypt.compare(password, user.password)
		if(!passwordMatch) {
			return getMessageStatusCode(401)
		}

		this.token = jwt.sign({ userId: user.name }, 'my-secret-key', { expiresIn: '10s' });
		return this.token
  }

}

export default new AuthMicroServices()