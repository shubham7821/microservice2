"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSchema = void 0;
const mongoose = require("mongoose");
exports.EmployeeSchema = new mongoose.Schema({
    employeeId: { type: Number, unique: true },
    name: String,
    email: String,
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
});
//# sourceMappingURL=employee.schema.js.map