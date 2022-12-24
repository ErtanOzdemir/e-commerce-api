import UserService from "../services/user";
import bcrypt from "bcrypt";
import { UserSchemaType } from "../db/user";
import jwt from "jsonwebtoken";
import { IUser } from "../types";

const createUser = async ({
  fullName,
  phone,
  avatarURL,
  password,
  email,
  address,
}: IUser) => {
  return await UserService.createUser({
    fullName,
    phone,
    avatarURL,
    password,
    email,
    address,
  });
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user: Promise<UserSchemaType> | any = await UserService.findUser({
    email,
  });

  if (!user) {
    throw new Error("We couldn't find user with this e-mail address.");
  }

  const isPasswordsMatched: boolean = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordsMatched) {
    throw new Error("Password and E-mail doesn't match!");
  }

  return jwt.sign(
    { id: user._id, fullName: user.fullName, email: user.email, isAuth: true },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: "15d",
    }
  );
};

const findUserById = async ({ id }: { id: string }) => {
  return await UserService.findUserById({ id });
};

export default { createUser, login, findUserById };
