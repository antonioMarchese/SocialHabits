import { decrypt } from "@/lib/sessions";
import { TRPCError, initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import superjson from "superjson";
import { ZodError, z } from "zod";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return { ...opts };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    console.error(shape?.message);
    return {
      ...shape,
      data: {
        ...shape.data,
        apiError: {
          message: shape.message,
        },
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  // JWT Integration
  const session = cookies().get("habits_session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    // redirect("/");
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Autenticação necessária",
    });
  }

  const { username } = payload;

  return next({
    ctx: {
      ...ctx,
      username,
    },
  });
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use(isAuthenticated);
