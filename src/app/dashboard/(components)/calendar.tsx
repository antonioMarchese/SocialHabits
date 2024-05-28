import { weekDays } from "@/utils/choices";
import { generateDatesFromMonthBegining } from "@/utils/generateDatesFromMonthBeggining";
import dayjs from "dayjs";
import { useState } from "react";
import ContainerHeader from "./containerHeader";
import { useHabitStore } from "@/store/useHabitStore";
import clsx from "clsx";
import { api } from "@/trpc/react";

export default function Calendar() {
  const today = dayjs();
  const [dates, setDates] = useState(() => {
    return generateDatesFromMonthBegining(today.toString());
  });
  const { setHabitDate } = useHabitStore();
  const { data: habits } = api.habits.getAll.useQuery();
  console.info({ habits });

  function handleSetHabitDate(date: Date) {
    setHabitDate(dayjs(date));
  }

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
      <div className="grid grid-cols-7 divide-x divide-y divide-zinc-500 border-b border-r border-zinc-500">
        {dates.map((date, index) => {
          const currentDate = dayjs(date);
          const dateMonth = currentDate.month();
          return (
            <button
              type="button"
              onClick={() => handleSetHabitDate(date)}
              key={index}
              className={clsx(
                "first:border-t first:border-l first:border-zinc-500 relative flex items-center flex-col px-1 py-1 md:py-2 overflow-hidden justify-start hover:cursor-pointer h-10 md:h-20 gap-2 disabled:cursor-not-allowed",
                {
                  "bg-zinc-900 hover:bg-zinc-800":
                    currentDate.date() === dayjs().date(),
                  "hover:bg-zinc-900": currentDate.date() !== dayjs().date(),
                }
              )}
            >
              {dateMonth === today.month() && (
                <>
                  <p className="w-full text-left text-xs text-zinc-300">
                    {currentDate.format("DD")}
                  </p>
                  <ul className="hidden text-[10px] w-full items-center justify-center md:flex flex-col px-1">
                    {habits
                      ?.filter((habit) =>
                        habit.habit_week_days.some(
                          (day) =>
                            day.week_day === currentDate.day() &&
                            habit.created_at <= new Date(date)
                        )
                      )
                      .map((habit, index) => (
                        <li key={index} className="w-full text-left truncate">
                          {habit.title}
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
