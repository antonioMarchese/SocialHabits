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
      logs: {
        where: {
          completed: true,
          log: {
            AND: [
              {
                date: {
                  gte: weekStart,
                },
              },
              {
                date: {
                  lt: weekEnd,
                },
              },
            ],
          },
        },
        include: {
          log: {
            select: {
              date: true,
            },
          },
        },
      },
      day_habits: {
        where: {
          day: {
            AND: [
              {
                date: {
                  gte: weekStart,
                },
              },
              {
                date: {
                  lt: weekEnd,
                },
              },
            ],
          },
        },
        select: {
          day: {
            select: {
              date: true,
            },
          },
        },
      },
      id: true,
      habit_week_days: true,
      title: true,
    },
  });

  const parsedHabits = habits?.map((habit) => ({
    id: habit.id,
    title: habit.title,
    weekRate: habit.habit_week_days.length,
    completed: habit.logs.length + habit.day_habits.length,
  }));

  return parsedHabits;
}
