import { prisma } from "@/lib/prisma";
import createDayLog from "@/server/api/useCases/dayLogs/create";
import createHabitsLog from "@/server/api/useCases/dayLogs/createHabitsLog";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.users.findMany();
    const today = dayjs().subtract(1, "day");
    const dayPromises = users.map(async (user) => {
      const dayLog = await createDayLog({ date: today, userId: user.id });
      await createHabitsLog({ date: today, userId: user.id });
      return dayLog;
    });

    const payload = await Promise.all(dayPromises);

    return NextResponse.json(payload);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
