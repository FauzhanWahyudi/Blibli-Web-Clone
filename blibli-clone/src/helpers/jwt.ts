import { IJwtSignInput } from "@/interfaces/jwt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;
export const signToken = (data: IJwtSignInput) => {
  return jwt.sign(data, secret);
};

export const verifyToken = (access_token: string) => {
  return jwt.verify(access_token, secret);
};
