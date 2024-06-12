import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { z } from "zod";

export const habitsStreakSchema = z.object({
  date: z.date(),
  userId: z.string(),
});

export type HabitsStreakProps = z.infer<typeof habitsStreakSchema>;

export default async function getStreaks({ date, userId }: HabitsStreakProps) {
  const weekStart = dayjs(date).startOf("week").toDate();
  const weekEnd = dayjs(date).endOf("week").toDate();

  const habits = await prisma.habits.findMany({
    where: {
      user_id: userId,
      created_at: {
        lte: weekEnd,
      },
      OR: [
        {
          deleted_at: {
            lte: weekEnd,
          },
        },
        {
          deleted_at: null,
        },
      ],
    },
    select: {
      habit_week_days: true,
      day_habits: {
        include: {
          day: {
            select: {
              date: true,
            },
          },
        },
      },
      id: true,
      title: true,
      created_at: true,
      deleted_at: true,
      updated_at: true,
    },
  });

  const parsedHabits = habits.map((habit) => ({
    ...habit,
    day_habits: habit.day_habits.filter(
      (dayHabit) =>
        dayjs(dayHabit.day.date).isAfter(weekStart) &&
        dayjs(dayHabit.day.date).isBefore(weekEnd)
    ),
  }));

  return parsedHabits;
}
