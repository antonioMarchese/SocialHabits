import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure } from "../trpc";
import getUserByUsername from "../useCases/users/getUserByUsername";
import createHabit from "../useCases/habits/createHabit";
import { z } from "zod";
import dayjs from "dayjs";
import getWeekDayHabits from "../useCases/habits/getWeekDayHabits";
import getCompletedDayHabits from "../useCases/habits/getCompletedHabits";
import toggleCompletedHabit, {
  toggleHabitSchema,
} from "../useCases/habits/toggleCompletedHabit";
import {
  createHabitInput,
  getDayHabitsInput,
  toggleCompletedInput,
} from "@/utils/types/habits";
import getAllHabits from "../useCases/habits/getAllHabits";

export const habitsRouter = createTRPCRouter({
  create: privateProcedure.input(createHabitInput).mutation(async (opts) => {
    const { username } = opts.ctx;
    const { title, weekDays } = opts.input;

    const user = await getUserByUsername(username);
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Usuário não encontrado",
      });
    }

    const newHabit = await createHabit({ title, weekDays, userId: user.id });

    return newHabit;
  }),
  getAll: privateProcedure.query(async ({ ctx }) => {
    const { username } = ctx;

    const user = await getUserByUsername(username);
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Usuário não encontrado",
      });
    }

    const habits = await getAllHabits({ userId: user.id });
    return habits;
  }),
  dayHabits: privateProcedure
    .input(getDayHabitsInput)
    .query(async ({ input, ctx }) => {
      const { username } = ctx;
      const weekDay = dayjs(input.day).day();

      const user = await getUserByUsername(username);
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuário não encontrado",
        });
      }

      const habits = await getWeekDayHabits({
        userId: user.id,
        weekDay,
      });

      const completedHabits = await getCompletedDayHabits({
        day: dayjs(input.day).toString(),
        userId: user.id,
      });

      const parsedHabits = {
        habits,
        completedHabits,
      };

      return parsedHabits;
    }),
  toggleCompleted: privateProcedure
    .input(toggleCompletedInput)
    .mutation(async ({ ctx, input }) => {
      const { username } = ctx;
      const { habitId } = input;
      const user = await getUserByUsername(username);
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuário não encontrado",
        });
      }

      await toggleCompletedHabit({ habitId, userId: user.id });
    }),
});
