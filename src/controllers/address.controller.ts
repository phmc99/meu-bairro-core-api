import { NextFunction, Request, Response } from "express";
import { updateAddress } from "../services/address.service";
import { mailTemplateOptions, transport } from "../services/email.service";

export const updateCommerceAdress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const data = req.body;

    const addressUpdate = await updateAddress(id, data);

    const options = mailTemplateOptions(
      addressUpdate?.owner.email,
      "Atualização de dados",
      "confirmationAddress",
      {
        name: addressUpdate?.owner.firstName,
        commerce: addressUpdate.name,
        cep: addressUpdate.address.cep,
        state: addressUpdate.address.state,
        city: addressUpdate.address.city,
        neighborhood: addressUpdate.address.neighborhood,
        street: addressUpdate.address.street,
        number: addressUpdate.address.number,
        complement: addressUpdate.address.complement,
      }
    );

    transport.sendMail(options, function (err, info) {
      if (err) {
        return next(err);
      } else {
        console.log("Message sent:", info.response);
      }
    });

    res.status(201).send(addressUpdate);
  } catch (error) {
    next(error);
  }
};
