import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { User } from "../entities/user.entities";

export class UserRepository extends BaseRepository<User> {
  constructor(repository: Repository<User>) {
    super(repository);
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findByIdWithPosts(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["posts"],
    });
  }
}
