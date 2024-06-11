import { prisma } from "@/lib/prisma";
import { CreateDayLogProps } from "./create";

interface GetDayLogByDateProps extends CreateDayLogProps {}

export default async function getDayLogByDate({
  date,
  userId,
}: GetDayLogByDateProps) {
  const dayLog = await prisma.dayLog.findUnique({
    where: {
      date_user_id: {
        date: date.startOf("day").toDate(),
        user_id: userId,
      },
    },
  });

  return dayLog;
}
