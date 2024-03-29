export interface User {
    _id: string;
    email: string;
    displayName: string;
    avatar: string;
    token: string;
    role: string;
}

export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    image: File | null;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export type GlobalError = {
    error: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _name: string;
}

export interface Fullscreen {
    image: string;
    title: string;
}

export interface PhotoApi extends Fullscreen{
    user: {
        _id: string;
        displayName: string;
    };
    _id: string;
}

export interface PhotoMutation {
    title: string;
    image: File | null;
}