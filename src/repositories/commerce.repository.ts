import { EntityRepository, Repository } from "typeorm";
import { Commerce } from "../entities";

@EntityRepository(Commerce)
class CommerceRepository extends Repository<Commerce> {
  public async findPaginated(page = 1): Promise<Commerce[] | undefined> {
    const commerces = await this.find({
      take: 15,
      skip: (page - 1) * 10,
    });

    return commerces;
  }
}

export default CommerceRepository;
