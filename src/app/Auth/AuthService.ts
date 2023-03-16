import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface TokenPayload {
	username: string;
}

class AuthService {
  public users: User[] = [];
  private JWT_SECRET = 'nao-vai-achar';

  async register(user: User) {
    if (this.users.some(u => u.email === user.email || u.username === user.username)) {
      throw new Error('E-mail ou nome de usuário já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

		const newUser: User = {
      ...user,
      password: hashedPassword,
    };


    this.users.push(newUser);
		return this.users
  }

  async login(email: string, password: string) {
    const user = this.users.find(u => u.email === email);

		if(!user) {
			throw new Error('User not found')
		}

		const passwordMatch = await bcrypt.compare(password, user.password)
		if(!passwordMatch) {
			throw new Error('Incorrect password')
		}

		const token = jwt.sign({ username: user.username}, 'secret', { expiresIn: '1h' })
		return `magicToken=${token}`
  }
}

export default new AuthService()