import {ObjectId} from 'mongoose';

export interface IUser {
    email: string
    password: string;
    displayName: string;
    avatar: string;
    role: string;
    token: string;
    googleId?: string;
}

export interface IPhoto {
    user: ObjectId;
    title: string;
    image: string;
}