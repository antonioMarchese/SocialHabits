import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure } from "../trpc";
import getUserByUsername from "../useCases/users/getUserByUsername";
import { z } from "zod";
import dayjs from "dayjs";
import getDayLogsSummary from "../useCases/dayLogs/getSummary";

export const dayLogsRouter = createTRPCRouter({
  monthSummary: privateProcedure
    .input(
      z.object({
        date: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { username } = ctx;
      const { date } = input;

      const user = await getUserByUsername(username);
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuário não encontrado",
        });
      }

      const startDate = dayjs(date).startOf("month").startOf("day").toDate();
      const endDate = dayjs(date).endOf("month").startOf("day").toDate();

      const dayLogs = await getDayLogsSummary({
        start: startDate,
        end: endDate,
        userId: user.id,
      });
      return dayLogs;
    }),
});
