import { prisma } from "@/lib/prisma";
import { HabitWithRelations } from "@/store/useHabitStore";

interface UpdateHabitProps {
  habit: HabitWithRelations;
  title: string;
  weekDays: number[];
}

export default async function updateHabit({
  title,
  habit,
  weekDays,
}: UpdateHabitProps) {
  await prisma.habitWeekDays.deleteMany({
    where: {
      habit_id: habit.id,
      week_day: {
        notIn: weekDays,
      },
    },
  });

  const updatedHabit = await prisma.habits.update({
    where: {
      id: habit.id,
    },
    data: {
      title,
      habit_week_days: {
        create: weekDays
          .filter(
            (day) => !habit.habit_week_days.some((hwd) => hwd.week_day === day)
          )
          .map((day) => {
            return {
              week_day: day,
            };
          }),
      },
    },
  });

  return updatedHabit;
}
