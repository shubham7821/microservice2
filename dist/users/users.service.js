"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    createUser(username, email, password) {
        throw new Error('Method not implemented.');
    }
    async getUser(userName) {
        const username = userName.toLowerCase();
        const user = await this.userModel.findOne({ username });
        return user;
    }
    async updateRegistrationStatus(userId, status) {
        return await this.userModel.findByIdAndUpdate(userId, { status }, { new: true });
    }
    async insertUser(username, email, hashedPassword) {
        const newUser = new this.userModel({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
            status: 'pending',
        });
        return await newUser.save();
    }
    async findAllUsers() {
        return await this.userModel.find().exec();
    }
    async findUserById(userId) {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateUser(userId, updateUserDto) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userId, updateUserDto, { new: true })
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return updatedUser;
    }
    async deleteUser(userId) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('User not found');
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map