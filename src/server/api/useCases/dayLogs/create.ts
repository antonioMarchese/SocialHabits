import { prisma } from "@/lib/prisma";
import { Dayjs } from "dayjs";

export interface CreateDayLogProps {
  date: Dayjs;
  userId: string;
}

export default async function createDayLog({
  date,
  userId,
}: CreateDayLogProps) {
  const newDayLog = await prisma.dayLog.create({
    data: {
      date: date.startOf("day").toDate(),
      user_id: userId,
    },
  });

  console.log({
    level: "INFO",
    message: "Histórico de dia criado",
    extra: {
      userId,
      date: date.format("DD/MM/YYYY"),
    },
  });

  return newDayLog;
}
