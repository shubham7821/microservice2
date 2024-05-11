import { Model } from 'mongoose';
import { User } from './users.model';
export declare class UsersService {
    private readonly userModel;
    createUser(username: string, email: string, password: string): void;
    constructor(userModel: Model<User>);
    getUser(userName: string): Promise<User & Required<{
        _id: string;
    }>>;
    updateRegistrationStatus(userId: string, status: string): Promise<User>;
    insertUser(username: string, email: string, hashedPassword: string): Promise<User>;
    findAllUsers(): Promise<User[]>;
    findUserById(userId: string): Promise<User>;
    updateUser(userId: string, updateUserDto: any): Promise<User>;
    deleteUser(userId: string): Promise<void>;
}
