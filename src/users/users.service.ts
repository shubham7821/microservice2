import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {
  createUser(username: string, email: string, password: string) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
 
  //Signup user method with username and password
  // async insertUser(userName: string, password: string) {
  //   const username = userName.toLowerCase();
  //   const newUser = new this.userModel({
  //     username,
  //     password,
  //   });
  //   await newUser.save();
  //   return newUser;
  // }
  //log in user using the findOne method
  async getUser(userName: string) {
    const username = userName.toLowerCase();
    const user = await this.userModel.findOne({ username });
    return user;
  }
  async updateRegistrationStatus(userId: string, status: string): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userId, { status }, { new: true });
  }
  async insertUser(username: string, email: string, hashedPassword: string): Promise<User> {
    const newUser = new this.userModel({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword, // Pass the hashed password here
      status: 'pending', // Set default status as 'pending'
    });
    return await newUser.save();
  }
  async findAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(userId: string, updateUserDto: any): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
