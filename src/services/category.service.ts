import { getCustomRepository, getRepository } from "typeorm";
import { Category } from "../entities";
import AppError from "../errors/AppError";
import CategoryRepository from "../repositories/category.repository";

interface Body {
  name: string;
  description: string;
}

export const createCategory = async (body: Body) => {
  try {
    const { name, description } = body;

    const categoryRepository = getRepository(Category);

    const newCategory = categoryRepository.create({
      name,
      description,
    });

    await categoryRepository.save(newCategory);

    return newCategory;
  } catch {
    throw new AppError("This category name already exists", 400);
  }
};

export const listCategories = async () => {
  const categoryRepository = getRepository(Category);

  const category = await categoryRepository.find();

  return category;
};

export const updateCategory = async (id: string, data: any) => {
  const categoryRepository = getCustomRepository(CategoryRepository);

  const category = await categoryRepository.findId(id);

  return await categoryRepository.save({
    ...category,
    ...data,
  });
};

export const deleteCategory = async (id: string) => {
  const categoryRepository = getCustomRepository(CategoryRepository);

  const category = await categoryRepository.findId(id);

  if (!category) {
    throw new AppError("Category not found!", 404);
  }

  await categoryRepository.remove([category]);
};
