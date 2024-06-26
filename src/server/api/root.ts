import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "./routers/users.route";
import { authRouter } from "./routers/auth.route";
import { habitsRouter } from "./routers/habits.route";
import { dayLogsRouter } from "./routers/dayLogs.route";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  users: usersRouter,
  habits: habitsRouter,
  dayLogs: dayLogsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
