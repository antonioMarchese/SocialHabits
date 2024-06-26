import { prisma } from "@/lib/prisma";

export default async function getAllHabits({ userId }: { userId: string }) {
  const habits = await prisma.habits.findMany({
    where: {
      user_id: userId,
      OR: [
        {
          deleted_at: {
            lte: new Date(),
          },
        },
        {
          deleted_at: null,
        },
      ],
    },
    include: {
      day_habits: true,
      habit_week_days: true,
    },
  });

  return habits;
}
