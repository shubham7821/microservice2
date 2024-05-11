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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
let EmployeeController = class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async registerEmployee(employeeData) {
        return this.employeeService.registerEmployee(employeeData);
    }
    async approveEmployeeRegistration(id) {
        const approvedEmployee = await this.employeeService.approveEmployeeRegistration(id);
        return this.employeeService.getEmployeeById(approvedEmployee.id);
    }
    async getEmployeeDetails(id) {
        return this.employeeService.getEmployeeById(id);
    }
    async rejectEmployeeRegistration(id, rejectionReason) {
        const rejectedEmployee = await this.employeeService.rejectEmployeeRegistration(id, rejectionReason);
        return this.employeeService.getEmployeeById(rejectedEmployee.id);
    }
    async changeEmployeeStatus(id, status) {
        const updatedEmployee = await this.employeeService.changeEmployeeStatus(id, status);
        return this.employeeService.getEmployeeById(updatedEmployee.id);
    }
    async getAllEmployees() {
        return this.employeeService.getAllEmployees();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "registerEmployee", null);
__decorate([
    (0, common_1.Put)(':id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "approveEmployeeRegistration", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeDetails", null);
__decorate([
    (0, common_1.Put)(':id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('rejectionReason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "rejectEmployeeRegistration", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "changeEmployeeStatus", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getAllEmployees", null);
EmployeeController = __decorate([
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map