import { Model } from 'mongoose';
import { Employee } from './employee.schema';
import { MailerService } from '../mailer.service';
export declare class EmployeeService {
    private readonly employeeModel;
    private readonly mailerService;
    constructor(employeeModel: Model<Employee>, mailerService: MailerService);
    registerEmployee(employeeData: any): Promise<Employee>;
    approveEmployeeRegistration(employeeId: string): Promise<Employee>;
    rejectEmployeeRegistration(employeeId: string, rejectionReason: string): Promise<Employee>;
    changeEmployeeStatus(employeeId: string, status: string): Promise<Employee>;
    getEmployeeById(employeeId: string): Promise<Employee>;
    getAllEmployees(): Promise<Employee[]>;
    findEmployeeByUsername(username: string): Promise<Employee | null>;
}
