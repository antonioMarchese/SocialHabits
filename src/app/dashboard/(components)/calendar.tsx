import { weekDays } from "@/utils/choices";
import { generateDatesFromMonthBegining } from "@/utils/generateDatesFromMonthBeggining";
import dayjs from "dayjs";
import { useState } from "react";

export default function Calendar() {
  const today = dayjs();
  const [dates, setDates] = useState(() => {
    return generateDatesFromMonthBegining(today.toString());
  });

  return (
    <div className="w-full flex flex-col gap-8 px-2 py-4 border border-zinc-600 rounded-lg">
      <header className="w-full text-left flex flex-col items-start text-zinc-200">
        <h1 className="font-semibold text-xl">Calendário</h1>
        <small className="text-zinc-300 text-xs font-light">
          Mantenha o controle do seu progresso ao longo do tempo
        </small>
      </header>
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => (
          <p
            key={index}
            className="text-zinc-300 font-light text-lg text-center"
          >
            {day}
          </p>
        ))}
        {dates.map((date, index) => {
          const currentDate = dayjs(date);
          const dateMonth = currentDate.month();
          return (
            <div
              key={index}
              className="relative flex items-center justify-center border border-zinc-500 rounded-md hover:cursor-pointer min-h-12"
            >
              {dateMonth === today.month() && (
                <p className="absolute left-1 top-1 text-xs text-zinc-300">
                  {currentDate.format("DD")}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
