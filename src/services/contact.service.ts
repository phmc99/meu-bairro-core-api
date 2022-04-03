import { getRepository } from "typeorm";
import { Commerce, Contact } from "../entities";
import AppError from "../errors/AppError";

export const updateContact = async (commerceId: string, data: any) => {
  const commerceRepository = getRepository(Commerce);
  const contactRepository = getRepository(Contact);

  const commerce = await commerceRepository.findOne(commerceId);

  if (!commerce) {
    throw new AppError("Commerce not found!", 404);
  }

  const contact = await contactRepository.findOne(commerce?.contact);

  const updateResult = await contactRepository.save({ ...contact, ...data });

  const serialize = {
    name: commerce?.name,
    cnpj: commerce?.cnpj,
    id: commerce?.id,
    contact: {
      phone1: updateResult?.phone1,
      phone2: updateResult?.phone2,
      instagram: updateResult?.instagram,
      facebook: updateResult?.facebook,
      whatsapp: updateResult?.whatsapp,
    },
    owner: {
      firstName: commerce?.owner.firstName,
      lastName: commerce?.owner.lastName,
      email: commerce?.owner.email,
      id: commerce?.owner.id,
    },
  };

  return serialize;
};
