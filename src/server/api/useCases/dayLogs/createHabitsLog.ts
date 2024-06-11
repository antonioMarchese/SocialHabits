import { prisma } from "@/lib/prisma";
import getWeekDayHabits from "../habits/getWeekDayHabits";
import getCompletedDayHabits from "../habits/getCompletedHabits";
import createDayLog, { CreateDayLogProps } from "./create";
import getDayLogByDate from "./getDayLogByDate";

interface CreateHabitsLogProps extends CreateDayLogProps {}

export default async function createHabitsLog({
  date,
  userId,
}: CreateHabitsLogProps) {
  const weekDay = date.day();

  const userHabits = await getWeekDayHabits({ weekDay, userId });
  const completedHabits = await getCompletedDayHabits({
    day: date.toString(),
    userId,
    habits: userHabits,
  });

  let dayLog = await getDayLogByDate({ date, userId });

  if (!dayLog) {
    dayLog = await createDayLog({ date, userId });
  }

  if (dayLog) {
    const habitLogPromises = userHabits.map(async (habit) => {
      const habitLog = await prisma.habitLog.create({
        data: {
          log_id: dayLog.id,
          habit_id: habit.id,
          completed: completedHabits.includes(habit.id),
        },
      });
      return habitLog;
    });

    console.log({
      level: "INFO",
      message: "Histórico de hábitos criado",
      extra: {
        userId,
        date: date.format("DD/MM/YYYY"),
      },
    });
    return await Promise.all(habitLogPromises);
  }
}
