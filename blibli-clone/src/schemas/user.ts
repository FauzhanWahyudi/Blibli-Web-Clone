import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(5),
  phone: z.string().min(10),
});

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});
