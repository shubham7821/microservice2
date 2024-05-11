import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    addUser(userPassword: string, userEmail: string, userName: string): Promise<{
        msg: string;
        userId: any;
        userEmail: string;
        userName: string;
        status: string;
    }>;
    login(req: any): Promise<any>;
    getHello(req: any): string;
    logout(req: any): any;
}
