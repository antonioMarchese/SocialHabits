import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { z } from "zod";

export const weekDayHabitsSchema = z.object({
  weekDay: z.number().min(0).max(6),
  userId: z.string(),
});

export type WeekDayHabitsProps = z.infer<typeof weekDayHabitsSchema>;

export default async function getWeekDayHabits({
  weekDay,
  userId,
}: WeekDayHabitsProps) {
  const habits = await prisma.habits.findMany({
    where: {
      user_id: userId,
      habit_week_days: {
        some: {
          week_day: weekDay,
        },
      },
    },
    include: {
      day_habits: true,
    },
  });

  return habits;
}
