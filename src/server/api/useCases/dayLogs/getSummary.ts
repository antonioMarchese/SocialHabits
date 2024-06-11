import { prisma } from "@/lib/prisma";

interface DayLogsSummaryProps {
  start: Date;
  end: Date;
  userId: string;
}

export default async function getDayLogsSummary({
  start,
  end,
  userId,
}: DayLogsSummaryProps) {
  const dayLogs = await prisma.dayLog.findMany({
    where: {
      user_id: userId,
      AND: [
        {
          date: {
            gte: start,
          },
        },
        {
          date: {
            lte: end,
          },
        },
      ],
    },
    include: {
      habits: {
        select: {
          habit: {
            select: {
              title: true,
            },
          },
          completed: true,
          habit_id: true,
        },
      },
    },
  });

  return dayLogs;
}
