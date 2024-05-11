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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mailer_service_1 = require("../mailer.service");
let EmployeeService = class EmployeeService {
    constructor(employeeModel, mailerService) {
        this.employeeModel = employeeModel;
        this.mailerService = mailerService;
    }
    async registerEmployee(employeeData) {
        try {
            const createdEmployee = await this.employeeModel.create(employeeData);
            await this.mailerService.sendMail(createdEmployee.email, 'Welcome!', 'Welcome to our company!');
            return createdEmployee;
        }
        catch (error) {
            throw new Error('Failed to register employee');
        }
    }
    async approveEmployeeRegistration(employeeId) {
        const employee = await this.employeeModel.findByIdAndUpdate(employeeId, { $set: { status: 'Approved' } }, { new: true });
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        await this.mailerService.sendMail(employee.email, 'Registration Approved', 'Your registration has been approved.');
        return employee;
    }
    async rejectEmployeeRegistration(employeeId, rejectionReason) {
        const employee = await this.employeeModel.findByIdAndUpdate(employeeId, { $set: { status: 'Rejected' } }, { new: true });
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        await this.mailerService.sendMail(employee.email, 'Registration Rejected', `Your registration has been rejected with the following reason: ${rejectionReason}`);
        return employee;
    }
    async changeEmployeeStatus(employeeId, status) {
        const employee = await this.employeeModel.findByIdAndUpdate(employeeId, { $set: { status } }, { new: true });
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        return employee;
    }
    async getEmployeeById(employeeId) {
        const employee = await this.employeeModel.findById(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        return employee;
    }
    async getAllEmployees() {
        return this.employeeModel.find().exec();
    }
    async findEmployeeByUsername(username) {
        const employee = await this.employeeModel.findOne({ username }).exec();
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        return employee;
    }
};
EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Employee')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mailer_service_1.MailerService])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map