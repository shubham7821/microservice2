import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    status: string;
    role: string;
}>;
export interface User extends mongoose.Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    status: string;
    role: string;
}
