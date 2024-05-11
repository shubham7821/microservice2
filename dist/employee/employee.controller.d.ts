import { EmployeeService } from './employee.service';
import { Employee } from './employee.schema';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    registerEmployee(employeeData: any): Promise<Employee>;
    approveEmployeeRegistration(id: string): Promise<Employee>;
    getEmployeeDetails(id: string): Promise<Employee>;
    rejectEmployeeRegistration(id: string, rejectionReason: string): Promise<Employee>;
    changeEmployeeStatus(id: string, status: string): Promise<Employee>;
    getAllEmployees(): Promise<Employee[]>;
}
