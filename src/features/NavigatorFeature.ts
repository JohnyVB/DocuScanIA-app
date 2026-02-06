import { jwtDecode } from "jwt-decode";

type JwtPayload = { exp: number };

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Date.now() / 1000;

        return decoded.exp < now;
    } catch (error) {
        return true; // token inválido
    }
};
