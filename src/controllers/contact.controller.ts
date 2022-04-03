import { NextFunction, Request, Response } from "express";
import { updateContact } from "../services/contact.service";
import { mailTemplateOptions, transport } from "../services/email.service";

export const updateCommerceContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedContact = await updateContact(id, req.body);

    const options = mailTemplateOptions(
      updatedContact?.owner.email,
      "Atualização de dados",
      "confirmationContact",
      {
        name: updatedContact?.owner.firstName,
        commerce: updatedContact.name,
        phone1: updatedContact.contact.phone1,
        phone2: updatedContact.contact.phone2,
        instagram: updatedContact.contact.instagram,
        facebook: updatedContact.contact.facebook,
        whatsapp: updatedContact.contact.whatsapp,
      }
    );

    transport.sendMail(options, function (err, info) {
      if (err) {
        return next(err);
      } else {
        console.log("Message sent:", info.response);
      }
    });

    res.send(updatedContact);
  } catch (err) {
    next(err);
  }
};
