import { User } from '../Models/User';

export interface UserInterface  {
    createUser(user: User): Promise<any>;
    findUsersAll(userData: any): Promise<User[]>
    findByEmailOrUsername(user: User): Promise<User>;
    findByEmailOrPassword(user: User): Promise<User>;
    findUserById(userId: number): Promise<any>;
    updateUserById(userId: string, userData: any): Promise<any>;
    deleteUserById(userId: string): Promise<any>;
}
