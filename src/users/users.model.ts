import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending' // Default status to 'pending'
    },
    role: {
        type: String,
        default: 'user' // Default role to 'user'
    }
}, { timestamps: true });

// User interface
export interface User extends mongoose.Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    status: string;
    role: string; // Role property
}
