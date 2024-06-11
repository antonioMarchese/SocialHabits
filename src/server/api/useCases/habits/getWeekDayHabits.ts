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
    select: {
      habit_week_days: true,
      day_habits: true,
      id: true,
      title: true,
      user: true,
      created_at: true,
      deleted_at: true,
      updated_at: true,
    },
  });

  return habits;
}
