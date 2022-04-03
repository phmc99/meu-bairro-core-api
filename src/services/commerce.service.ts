import { getCustomRepository, getRepository } from "typeorm";

import {
  Address,
  Category,
  Commerce,
  Contact,
  Images,
  User,
} from "../entities";
import AppError from "../errors/AppError";
import CategoryRepository from "../repositories/category.repository";
import { cep_finder } from "./address.service";
import { imageUpload } from "./image.service";

interface Body {
  name: string;
  cnpj: string;
  description: string;
  category: string;
  cep: string;
  number: string;
  complement: string;
  phone1: string;
  phone2: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
}

export const create = async (body: Body, user: any) => {
    const {
      name,
      cnpj,
      category,
      cep,
      number,
      complement,
      phone1,
      phone2,
      instagram,
      facebook,
      whatsapp,
    } = body;

    const commerceRepository = getRepository(Commerce);
    const addressRepository = getRepository(Address);
    const categoryRepository = getCustomRepository(CategoryRepository);
    const contactRepository = getRepository(Contact);
    const imageRepository = getRepository(Images);

    const cepInfo = await cep_finder(cep, number, complement);
    const address = addressRepository.create(cepInfo);
    await addressRepository.save(address);

    const categoryCommerce = await categoryRepository.findName(category);

    if (!categoryCommerce) {
      throw new AppError("Category not found!", 404);
    }

    const newContact = contactRepository.create({
      phone1,
      phone2,
      instagram,
      facebook,
      whatsapp,
    });

    await contactRepository.save(newContact);

    const urlsImages = await imageUpload(cnpj);

    const newImages = imageRepository.create({
      ...urlsImages,
    });

    await imageRepository.save(newImages);

    const commerce = commerceRepository.create({
      name,
      cnpj,
      category: [categoryCommerce],
      address: address,
      contact: newContact,
      image: newImages,
      owner: user,
    });

    await commerceRepository.save(commerce);

    return commerce;
};

export const listAllCommerces = async () => {
  const commerceRepository = getRepository(Commerce);

  const commerces = await commerceRepository.find();

  return commerces;
};

export const listOneCommerce = async (commerceId: string) => {
  const commerceRepository = getRepository(Commerce);

  const commerce = await commerceRepository.findOne(commerceId, {
    relations: ["feedback", "category"]
  });

  return commerce;
};
