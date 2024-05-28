import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { z } from "zod";

export const completedDayHabits = z.object({
  day: z.string(),
  userId: z.string(),
});

export type CompletedDayHabits = z.infer<typeof completedDayHabits>;

export default async function getCompletedDayHabits({
  day,
  userId,
}: CompletedDayHabits) {
  const habitsDay = await prisma.days.findUnique({
    where: {
      date_user_id: {
        date: dayjs(day).startOf("day").toDate(),
        user_id: userId,
      },
    },
    include: {
      day_habits: true,
    },
  });

  const completedHabits =
    habitsDay?.day_habits.map((dayHabit) => dayHabit.habit_id) ?? [];

  return completedHabits;
}
