import { ObjectId } from "mongodb";

export interface IUser {
  _id?: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILogin {
  email: string;
  password: string;
}
