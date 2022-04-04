import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOneOrFail({
      where: {
        email,
      },
      select: ["email", "id", "password", "isAdm"],
    });

    return user;
  }

  public async findPaginated(page = 1): Promise<User[] | undefined> {
    const users = await this.find({
      take: 15,
      skip: (page - 1) * 10,
    });

    return users;
  }
}

export default UserRepository;
