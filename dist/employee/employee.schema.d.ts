import * as mongoose from 'mongoose';
export declare const EmployeeSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    status: "Pending" | "Approved" | "Rejected";
    name?: string;
    email?: string;
    employeeId?: number;
}>;
export interface Employee extends mongoose.Document {
    password(password: string, password1: any): unknown;
    username: any;
    employeeId: number;
    name: string;
    email: string;
    status: string;
}
