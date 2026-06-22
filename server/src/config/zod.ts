// zod validator
import { z } from "zod";

//register
export const registerValidator = z.object({
  name: z
    .string()
    .trim()
    .min(4, "Name must be at least 4 characters long")
    .max(50, "Name cannot exceed 50 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password cannot exceed 100 characters"),
});

//*এখানে RegisterInput automatically TypeScript type generate করবে, ফলে আলাদা RegisterPayload interface লেখারও দরকার হবে না। */
export type RegisterInput = z.infer<typeof registerValidator>;

// login validations
export const loginValidator = z.object({
  email: z.string().email("invalid email"),
    password: z.string().min(6, "invalid password , must be 6 carecter or more")
});

export type LoginInput = z.infer<typeof loginValidator>;