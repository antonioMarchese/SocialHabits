import { prisma } from "@/lib/prisma";
import dayjs, { Dayjs } from "dayjs";

interface GetHabitDayLogByIntervalProps {
  startDate: Dayjs;
  endDate: Dayjs;
  userId: string;
  habitId: string;
}

export default async function getHabitDayLogByInterval({
  startDate,
  endDate,
  userId,
  habitId,
}: GetHabitDayLogByIntervalProps) {
  const dayLog = await prisma.dayLog.findMany({
    where: {
      user_id: userId,
      habits: {
        some: {
          habit_id: habitId,
        },
      },
      AND: [
        {
          date: {
            gte: dayjs(startDate).toDate(),
          },
        },
        {
          date: {
            lt: dayjs(endDate).toDate(),
          },
        },
      ],
    },
  });

  return dayLog;
}
