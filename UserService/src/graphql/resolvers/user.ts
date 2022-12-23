import UserController from "../../controllers/user";
import { UserType } from "../../data-access/user";

const resolvers = {
  Query: {
    async me(_: any, __: any, ctx: any) {
      if (!ctx || !ctx.id || !ctx.isAuth) {
        throw new Error("You have to login!");
      }
      return await UserController.findUserById({ id: ctx.id });
    },
  },
  Mutation: {
    async login(_: any, { email, password }: UserType, ___: any) {
      return await UserController.login({ email, password });
    },
    async register(
      _: any,
      { email, password, phone, fullName }: UserType,
      ___: any
    ) {
      return await UserController.createUser({
        email,
        password,
        phone,
        fullName,
      });
    },
  },
  User: {
    async __resolveReference(user: any) {
      return await UserController.findUserById({ id: user.id });
    },
  },
};

export { resolvers };
