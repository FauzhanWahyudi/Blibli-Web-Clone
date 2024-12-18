import { IJwtSignInput } from "@/interfaces/jwt";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

const secret = process.env.JWT_SECRET as string;
export const signToken = (data: IJwtSignInput) => {
  return jwt.sign(data, secret);
};

// export const verifyToken = (access_token: string) => {
//   return jwt.verify(access_token, secret);
// };

const joseSecret = new TextEncoder().encode(secret);
export async function joseVerify(access_token: string) {
  const { payload } = await jwtVerify(access_token, joseSecret);
  return payload;
}
