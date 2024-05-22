import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import getUserByUsername from "../useCases/users/getUserByUsername";
import { z } from "zod";
import { compare } from "bcryptjs";
import { createSession, deleteSession } from "@/lib/sessions";
import { LOGIN_ERROR_MESSAGES } from "@/utils/choices";

const loginObjectProps = z.object({
  username: z.string(),
  password: z.string(),
});

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(loginObjectProps).mutation(async ({ input }) => {
    const user = await getUserByUsername(input.username);
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: LOGIN_ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }

    const isPasswordValid = await compare(input.password, user.password);

    if (!isPasswordValid)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: LOGIN_ERROR_MESSAGES.WRONG_CREDENTIALS,
      });

    await createSession(input.username);

    return true;
  }),
  logout: publicProcedure.mutation(async () => {
    deleteSession();
  }),
});
