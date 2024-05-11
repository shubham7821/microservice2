import { UserRoles } from './user-roles.enum';
export declare class User {
    id: number;
    email: string;
    username: string;
    password: string;
    role: UserRoles;
}
