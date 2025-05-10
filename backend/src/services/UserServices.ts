import { User } from "../entities/user.entities";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async Register(userData: Partial<User>) {
    const existingUser = await this.userRepository.findByEmail(userData.email!);
    if (existingUser) {
      throw new Error("User already existed with this email");
    }
    const hashPassword = await bcrypt.hash(userData.password!, 10);
    const user = await this.userRepository.create({
      ...userData,
      password: hashPassword,
    });
    if (!user) {
      throw new Error("Error creating user");
    }
    const token = this.generateToken(user);
    return { user, token };
  }

  async Login(
    password: string,
    email: string
  ): Promise<{ loginUser: User; token: string }> {
    const loginUser = await this.userRepository.findByEmail(email!);
    if (!loginUser) {
      throw new Error("User Does not exists with this email");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      loginUser.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Passoword is not correct");
    }
    const token = this.generateToken(loginUser);
    return { loginUser, token };
  }
  private generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "some",
      { expiresIn: "10d" }
    );
  }
  async getProfile(userId: string): Promise<User | null> {
    return this.userRepository.findByIdWithPosts(userId);
  }
  async updateUser(userId: string, userData: Partial<User>) {
    if (userData.password) {
      delete userData.password;
    }
    return this.userRepository.update(userId, userData);
  }
}
