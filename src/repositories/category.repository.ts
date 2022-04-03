import { EntityRepository, Repository } from "typeorm";
import { Category } from "../entities";

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  public async findId(id: string): Promise<Category | undefined> {
    const category = await this.findOne({
      where: {
        id,
      },
    });

    return category;
  }
  public async findName(name: string): Promise<Category | undefined> {
    const category = await this.findOne({
      where: {
        name,
      },
    });

    return category;
  }
}

export default CategoryRepository;
