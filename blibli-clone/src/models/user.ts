import { db } from "@/db";
import { comparePassword, hashPassword } from "@/helpers/hash";
import { signToken } from "@/helpers/jwt";
import { ILogin, IUser } from "@/interaces/user";
import { ObjectId } from "mongodb";
import { string, z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});
class User {
  static collection = db.collection("users");

  static async findAll() {
    try {
      return await User.collection.find().toArray();
    } catch (error) {
      console.log("🚀 ~ User ~ findAll ~ error:", error);
      throw error;
    }
  }

  static async findById(_id: string) {
    try {
      return await User.collection.findOne({ _id: new ObjectId(_id) });
    } catch (error) {
      console.log("🚀 ~ User ~ findById ~ error:", error);
      throw error;
    }
  }

  static async findByUsername(username: string) {
    try {
      return await User.collection.findOne({ username });
    } catch (error) {
      console.log("🚀 ~ User ~ findById ~ error:", error);
      throw error;
    }
  }

  static async findByEmail(email: string) {
    try {
      return await User.collection.findOne({ email });
    } catch (error) {
      console.log("🚀 ~ User ~ findById ~ error:", error);
      throw error;
    }
  }

  static async addUser(body: IUser) {
    try {
      //Validation input with zod
      UserSchema.parse(body);
      const newUser = {
        ...body,
        password: hashPassword(body.password),
      };
      await User.collection.insertOne(newUser);
      return { newUser };
    } catch (error) {
      console.log("🚀 ~ User ~ addUser ~ error:", error);
      throw error;
    }
  }

  static async login(body: ILogin) {
    try {
      const { email, password } = body;
      const user = await User.collection.findOne({ email });

      if (!user) {
        throw new Error("Invalid username/password");
      }
      const isValidatePassword = comparePassword(password, user.password);
      if (!isValidatePassword) {
        throw new Error("Invalid username/password");
      }
      const access_token = signToken({
        _id: user._id,
        email: user.email,
      });
      return { access_token, user };
    } catch (error) {
      console.log("🚀 ~ User ~ login ~ error:", error);
      throw error;
    }
  }

  static async search(search: string) {
    try {
      const users = await User.collection
        .find({
          $or: [
            { name: { $regex: search, $options: "i" } },
            { username: { $regex: search, $options: "i" } },
          ],
        })
        .toArray();
      return users;
    } catch (error) {
      console.log("🚀 ~ User ~ search ~ error:", error);
      throw error;
    }
  }
}

export default User;
