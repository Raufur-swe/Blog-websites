export type UserRole = "admin" | "user";

export interface Iuser {
    name: string;
    email: string;
    password: string;
    role: UserRole;

}