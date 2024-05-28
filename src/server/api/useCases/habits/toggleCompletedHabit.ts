import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { z } from "zod";

export const toggleHabitSchema = z.object({
  habitId: z.string(),
  userId: z.string(),
});

export type ToggleCompletedHabitProps = z.infer<typeof toggleHabitSchema>;

export default async function toggleCompletedHabit({
  habitId,
  userId,
}: ToggleCompletedHabitProps) {
  const today = dayjs().startOf("day").toDate();

  let day = await prisma.days.findUnique({
    where: {
      date_user_id: {
        date: today,
        user_id: userId,
      },
    },
  });

  if (!day) {
    day = await prisma.days.create({
      data: {
        date: today,
        user_id: userId,
      },
    });
  }

  const dayHabit = await prisma.dayHabits.findUnique({
    where: {
      day_id_habit_id: {
        day_id: day.id,
        habit_id: habitId,
      },
    },
  });

  // Removendo a marcação de completo
  if (dayHabit) {
    await prisma.dayHabits.delete({
      where: {
        id: dayHabit.id,
      },
    });
  } else {
    // Completar o hábito
    await prisma.dayHabits.create({
      data: {
        day_id: day.id,
        habit_id: habitId,
      },
    });
  }
}
