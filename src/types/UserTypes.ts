export type User = {
    uid: string;
    email: string;
    name: string;
    lastname: string;
    resetPasswordCode: string;
};
export type UserCredentials = { email: string; password: string };
export type AuthResponse = {
    status: string;
    message: string;
    token?: string;
    user?: User;
};
