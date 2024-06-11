import { prisma } from "@/lib/prisma";
import { HabitWithRelations } from "@/store/useHabitStore";
import dayjs from "dayjs";

export interface CompletedDayHabits {
  habits: HabitWithRelations[];
  day: string;
  userId: string;
}

export default async function getCompletedDayHabits({
  day,
  userId,
  habits,
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
    habitsDay?.day_habits
      .filter((dayHabit) =>
        habits.find((habit) => habit.id === dayHabit.habit_id)
      )
      .map((dayHabit) => dayHabit.habit_id) ?? [];

  return completedHabits;
}
