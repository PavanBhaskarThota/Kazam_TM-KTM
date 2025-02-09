import UserModel from "../Models/user.mode";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BlacklistModel from "../Models/blacklist";

class UserService {
  async signup(user: any) {
    try {
      const { name, email, password } = user;
      const userExists = await UserModel.findOne({ email });

      if (userExists) {
        return {message:"User already exists!"};
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ name, email, password: hashedPassword });
      await newUser.save();

      
      const token = jwt.sign({ userId: newUser._id, userEmail: newUser.email }, "secret", {
        expiresIn: "7d",
      });

      return {
        userDetails: {
          userId: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        token,
        message: "User created successfully",
      };
    } catch (error) {
      return error;
    }
  }

  async login(user: any) {
    try {
      const { email, password } = user;
      const userExists = await UserModel.findOne({ email });
      if (!userExists) {
        return {message:"User does not exist"};
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        userExists.password
      );
      if (!isPasswordValid) {
        return {message:"Invalid credentials"};
      }
     
      const token = jwt.sign({ userId: userExists._id, userEmail: userExists.email }, "secret", {
        expiresIn: "7d",
      });
      return {
        userDetails: {
          userId: userExists._id,
          name: userExists.name,
          email: userExists.email,
        },
        token,
        message: "User logged in successfully",
      };
    } catch (error) {
      return error;
    }
  }

  async logout(token: string) {
    try {
      const result = new BlacklistModel({ token });
      await result.save();
      return {
        message: "User logged out successfully",
      };
    } catch (error) {
      return error;
    }
  }
}

export default new UserService();
