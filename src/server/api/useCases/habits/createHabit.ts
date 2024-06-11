import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { z } from "zod";

export const createHabitsSchema = z.object({
  userId: z.string(),
  title: z.string(),
  weekDays: z.array(z.number()).min(0).max(7),
});

export type CreateHabitsProps = z.infer<typeof createHabitsSchema>;

export default async function createHabit({
  title,
  userId,
  weekDays,
}: CreateHabitsProps) {
  const today = dayjs().startOf("day").toDate(); // starOf('day') zera as horas e minutos do dia

  const habit = await prisma.habits.create({
    data: {
      user_id: userId,
      title,
      created_at: today,
      habit_week_days: {
        create: weekDays.map((day) => {
          return {
            week_day: day,
          };
        }),
      },
    },
  });

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

  return habit;
}
