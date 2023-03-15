import { User } from '../Models/User';

export interface UserInterface  {
  createUser(user: any): Promise<User | void>;
  findUserAll(): Promise<User[]>;
  findUserById(id: number): Promise<User | null>;
  updateUserById(id: number): Promise<User | boolean>;
  deleteUserById(id: number): Promise<User | boolean>;
}
