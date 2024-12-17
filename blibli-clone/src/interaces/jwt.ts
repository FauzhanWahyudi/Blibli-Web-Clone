import { ObjectId } from "mongodb";

export interface IJwtSignInput {
  _id: ObjectId;
  email: string;
}
