import { useProfileDayLogs } from "@/hooks/useProfileDayLogs";
import { useDayLogStore } from "@/store/useDayLogStore";
import { useHabitStore } from "@/store/useHabitStore";
import { Percentage } from "@/utils/generateProgressPercentage";
import clsx from "clsx";
import dayjs from "dayjs";

interface CalendarCellProps {
  date: Date;
  completed: number;
  amount: number;
}

export default function CalendarCell({
  date,
  completed = 0,
  amount = 0,
}: CalendarCellProps) {
  const completedPercent = Percentage(amount, completed);
  const today = dayjs().startOf("day");
  const currentDate = dayjs(date);
  const dateMonth = currentDate.month();
  const isCurrentDay = dayjs(date).isSame(today.toDate());

  const { setHabitDate, habitDate } = useHabitStore();
  const { setSelectedDayLog } = useDayLogStore();

  const isSelected = dayjs(date).isSame(habitDate.startOf("day").toDate());

  const { dayLogs } = useProfileDayLogs();

  function handleSetHabitDate(date: Date) {
    const newDate = dayjs(date);
    setHabitDate(newDate);

    if (newDate.startOf("day").isBefore(dayjs().startOf("day"))) {
      const dayLog = dayLogs?.find((dl) =>
        dayjs(dl.date).startOf("day").isSame(newDate.startOf("day"))
      );
      if (dayLog) {
        setSelectedDayLog(dayLog);
      }
    } else {
      setSelectedDayLog(null);
    }
  }

  if (dateMonth !== today.month()) {
    return (
      <div className="flex items-center h-10 md:h-20 gap-2 bg-zinc-950 border-2 border-zinc-900 rounded-sm"></div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => handleSetHabitDate(date)}
      className={clsx(
        "relative flex items-center flex-col px-1 py-1 md:py-2 overflow-hidden justify-start hover:cursor-pointer h-10 md:h-20 gap-2 rounded-sm disabled:cursor-not-allowed",
        {
          "bg-zinc-900 border-2 border-zinc-800":
            completedPercent === 0 && !isCurrentDay && !isSelected,
          "bg-violet-900 border-violet-700":
            completedPercent > 0 && completedPercent < 20,
          "bg-violet-800 border-violet-600":
            completedPercent >= 20 && completedPercent < 40,
          "bg-violet-700 border-violet-500":
            completedPercent >= 40 && completedPercent < 60,
          "bg-violet-600 border-violet-500":
            completedPercent >= 60 && completedPercent < 80,
          "bg-violet-500 border-violet-400": completedPercent >= 80,
          "border-zinc-100 border-[3px]": isCurrentDay,
          "border-zinc-400 border-2": isSelected && !isCurrentDay,
        }
      )}
    >
      {dateMonth === today.month() && (
        <>
          <p className="w-full text-left text-xs text-zinc-300">
            {currentDate.format("DD")}
          </p>
        </>
      )}
    </button>
  );
}
