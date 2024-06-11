import { weekDays } from "@/utils/choices";
import ContainerHeader from "../containerHeader";
import { useProfileHabits } from "@/hooks/useProfileHabits";

export default function WeekDayScheduler() {
  const { habits } = useProfileHabits();

  if (habits?.length === 0) return <></>;

  return (
    <div className="w-full flex-1 flex flex-col gap-2 px-2 py-4 border border-zinc-600 rounded-lg">
      <ContainerHeader title="Frequência" />

      <div className="grid grid-cols-2">
        <p className="font-bold md:text-lg">Hábito</p>
        <div className="grid grid-cols-7">
          {weekDays.map((day, index) => (
            <p
              key={index}
              className="text-zinc-300 font-light text-[8px] 2xs:text-[10px] sm:text-xs xl:text-sm 2xl:text-lg text-center"
            >
              {day.slice(0, 3)}
            </p>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2">
        {habits?.map((habit, id) => (
          <>
            <p className="font-light md:text-md max-w-full truncate">
              {habit.title}
            </p>
            <div className="grid grid-cols-7">
              {weekDays.map((day, index) => (
                <div className="w-full flex items-center justify-center">
                  <div className="size-3 2xs:size-4 rounded-full border border-zinc-400 flex items-center justify-center">
                    {habit.habit_week_days.some(
                      (hwd) => hwd.week_day === index
                    ) && (
                      <div className="size-2 2xs:size-3 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
