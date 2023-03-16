import { User } from '../Models/User';

export interface UserInterface  {
  createUser(user: any): Promise<User | void>;
  findUserAll(users: any): Promise<User[]>;
  findUserById(id: number): Promise<number | boolean>;
  updateUserById(id: number): Promise<User | boolean>;
  deleteUserById(id: number): Promise<number | boolean>;
}
