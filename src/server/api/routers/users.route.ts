import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import createUser, { createUserProps } from "../useCases/users/createUser";
import getUserByUsername from "../useCases/users/getUserByUsername";
import getUserByEmail from "../useCases/users/getUserByEmail";
import { REGISTER_ERROR_MESSAGES } from "@/utils/choices";

export const usersRouter = createTRPCRouter({
  register: publicProcedure.input(createUserProps).mutation(async (opts) => {
    const { email, username } = opts.input;

    const usernameAlredyExists = await getUserByUsername(username);
    if (usernameAlredyExists) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: REGISTER_ERROR_MESSAGES.USERNAME_ALREDY_EXISTS,
      });
    }

    const emailAlredyExists = await getUserByEmail(email);
    if (emailAlredyExists) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: REGISTER_ERROR_MESSAGES.EMAIL_ALREDY_EXISTS,
      });
    }

    const newUser = await createUser(opts.input);

    return newUser;
  }),
  me: privateProcedure.query(async ({ ctx }) => {
    const { username } = ctx;
    return getUserByUsername(username);
  }),
});
