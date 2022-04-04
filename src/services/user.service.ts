import { getCustomRepository, getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities";
import UserRepository from "../repositories/user.repository";
import AppError from "../errors/AppError";
import { cloudUpload } from "./cloudinary.service";
import { readdirSync } from "fs";
import path from "path";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  birthDate: Date;
}

const serializeBody = (body: any) => {
  return {
    firstName: body.firstName.toLowerCase(),
    lastName: body.lastName.toLowerCase(),
    email: body.email.toLowerCase(),
    phone: body.phone.replace(/[^0-9]/g, ""),
    password: body.password,
    birthDate: body.birthDate,
    avatarUrl: "",
  };
};

export const createUser = async (body: IUser) => {
  const newBody = serializeBody(body);

  const userRepository = getRepository(User);

  const newUser = userRepository.create({ ...newBody });

  await userRepository.save(newUser);

  const { id, firstName, lastName, email, avatarUrl, createdAt } = newUser;

  return {
    id,
    firstName,
    lastName,
    email,
    avatarUrl,
    createdAt,
  };
};

export const login = async (email: string, password: string) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new AppError("Wrong email/password", 401);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, isAdm: user.isAdm },
    process.env.SECRET as string,
    { expiresIn: "1d" }
  );

  return {
    userId: user.id,
    token,
  };
};

export const listAllUsers = async (page: number) => {
  const userRepository = getCustomRepository(UserRepository);

  if (page === NaN) {
    page = 1;
  }

  const users = await userRepository.findPaginated(page);

  return users;
};

export const listOneUser = async (userId: string) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(userId);

  if (!user) {
    return undefined;
  }

  return {
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    birthDate: user?.birthDate,
    avatarUrl: user?.avatarUrl,
    hasCommerce: user?.hasCommerce,
    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
  };
};

export const admPermission = async (userId: string) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(userId);

  const userUpdated = await userRepository.save({
    ...user,
    isAdm: !user?.isAdm,
  });

  return userUpdated;
};

export const commerceOwnerPermission = async (userId: string) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(userId);

  const userUpdated = await userRepository.save({
    ...user,
    hasCommerce: !user?.hasCommerce,
  });

  return userUpdated;
};

export const updateAvatarUrl = async (userId: string) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(userId);

  const imagesFolder = path.resolve(__dirname, "..", "tmp", "uploads");
  let imagePath = "";

  readdirSync(imagesFolder).forEach((file) => {
    const fileSplit = file.split("_");
    if (fileSplit[0].includes(userId)) {
      imagePath = `${imagesFolder}/${file}`;
    }
  });

  const avatarUrl = await cloudUpload(imagePath);

  await userRepository.save({ ...user, avatarUrl });

  return { ...user, avatarUrl };
};

export const generateRecoveryToken = async (email: string) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET as string,
    { expiresIn: 300 }
  );

  return token;
};

export const changePassword = async (email: string, newPassword: string) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  newPassword = bcrypt.hashSync(newPassword, 10);

  await userRepository.save({ ...user, password: newPassword });

  return { message: "your password has been changed" };
};
