import axios from "axios";
import { getRepository } from "typeorm";
import { Address, Commerce } from "../entities";
import AppError from "../errors/AppError";

export const updateAddress = async (commerceId: string, data: any) => {
  const commerceRepository = getRepository(Commerce);
  const addressRepository = getRepository(Address);

  const commerce = await commerceRepository.findOne(commerceId);

  if (!commerce) {
    throw new AppError("Commerce not found!", 404);
  }

  const address = await addressRepository.findOne(commerce?.address);

  let newAddress;

  if (data.cep) {
    newAddress = await cep_finder(data.cep, data.number, data.complement);
  } else {
    newAddress = data;
  }
  const addressId = address?.id;
  const updateResult = await addressRepository.save({
    addressId,
    ...newAddress,
  });

  const serialize = {
    name: commerce?.name,
    cnpj: commerce?.cnpj,
    id: commerce?.id,
    address: {
      cep: updateResult?.cep,
      state: updateResult?.state,
      city: updateResult?.city,
      neighborhood: updateResult?.neighborhood,
      street: updateResult?.street,
      number: updateResult?.number,
      complement: updateResult?.complement,
      id: updateResult?.id,
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

export const cep_finder = async (
  cep: string,
  number: string,
  complement: string
) => {
  const api = await axios.get(`https://viacep.com.br/ws/${cep}/json`);

  if (api.data.erro) {
    throw new AppError("Invalid CEP!", 404);
  }

  const serialize = {
    cep: api.data.cep,
    state: api.data.uf,
    city: api.data.localidade,
    neighborhood: api.data.bairro,
    street: api.data.logradouro,
    number: number,
    complement: complement,
  };

  return serialize;
};
