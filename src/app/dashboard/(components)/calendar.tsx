import { weekDays } from "@/utils/choices";
import { generateDatesFromMonthBegining } from "@/utils/generateDatesFromMonthBeggining";
import dayjs from "dayjs";
import { useState } from "react";
import ContainerHeader from "./containerHeader";
import CalendarCell from "./days/calendarCell";
import { useProfileDayLogs } from "@/hooks/useProfileDayLogs";
import { api } from "@/trpc/react";

export default function Calendar() {
  const today = dayjs();
  const [dates, setDates] = useState(() => {
    return generateDatesFromMonthBegining(today.toString());
  });

  const { dayLogs } = useProfileDayLogs();

  const { data: todayHabits } = api.habits.dayHabits.useQuery(
    {
      day: today.startOf("day").toString(),
    },
    {
      staleTime: 1000 * 60 * 60 * 6,
    }
  );

  return (
    <div className="w-full flex-1 flex flex-col gap-2 px-2 py-4 border border-zinc-600 rounded-lg">
      <ContainerHeader
        title="Calendário"
        subtitle="Mantenha o controle do seu progresso ao longo do tempo"
      />

      <div className="grid grid-cols-7 mt-5">
        {weekDays.map((day, index) => (
          <p
            key={index}
            className="text-zinc-300 font-light text-xs md:text-lg text-center"
          >
            {day.slice(0, 3)}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2 xl:gap-4">
        {dates.map((date, index) => {
          const dayLog = dayLogs?.find((dayLog) =>
            dayjs(dayLog.date).startOf("day").isSame(dayjs(date))
          );
          const isToday = dayjs(date).isSame(today.startOf("day").toDate());

          if (isToday) {
            return (
              <CalendarCell
                amount={todayHabits?.habits.length ?? 0}
                completed={todayHabits?.completedHabits.length ?? 0}
                date={date}
              />
            );
          }

          return (
            <CalendarCell
              amount={dayLog ? dayLog.habits.length : 0}
              completed={
                dayLog
                  ? dayLog.habits.filter((logHabit) => logHabit.completed)
                      .length
                  : 0
              }
              date={date}
            />
          );
        })}
      </div>
    </div>
  );
}
