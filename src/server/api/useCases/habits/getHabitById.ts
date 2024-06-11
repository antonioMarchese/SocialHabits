import { prisma } from "@/lib/prisma";

export default async function getHabitById({ id }: { id: string }) {
  const habit = await prisma.habits.findUnique({
    where: {
      id,
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

  return habit;
}
