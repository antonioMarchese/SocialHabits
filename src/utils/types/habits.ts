import { z } from "zod";

export const createHabitInput = z.object({
  title: z.string(),
  weekDays: z.array(z.number()).min(0).max(7),
});

export const updateHabitInput = z.object({
  habitId: z.string(),
  title: z.string(),
  weekDays: z.array(z.number()).min(0).max(7),
});

export const getDayHabitsInput = z.object({
  day: z.string(),
});

export const toggleCompletedInput = z.object({
  habitId: z.string(),
});

export const getStreakInput = getDayHabitsInput;
