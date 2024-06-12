import { Checkbox } from "@/components/checkbox";
import { useDayLogStore } from "@/store/useDayLogStore";
import { CheckIcon } from "@heroicons/react/24/outline";
import EmptyHabits from "../habits/emptyHabits";
import ProgressBar from "../habits/progressBar";
import ContainerHeader from "../containerHeader";
import { weekDays } from "@/utils/choices";
import { useHabitStore } from "@/store/useHabitStore";
import dayjs from "dayjs";

export default function DayLogCard() {
  const { habitDate } = useHabitStore();
  const { selectedDayLog } = useDayLogStore();

  if (habitDate.startOf("day").isBefore(dayjs().startOf("day"))) {
    return (
      <div className="w-full flex flex-col items-center justify-start flex-1 2xl:max-w-lg gap-8 px-2 py-4 border border-zinc-600 rounded-lg relative">
        <ProgressBar
          progress={
            selectedDayLog
              ? selectedDayLog.habits.filter((hdl) => hdl.completed).length /
                selectedDayLog.habits.length
              : 0
          }
        />
        <div className="w-full flex items-center justify-between">
          <ContainerHeader
            title={weekDays[habitDate.day()]}
            subtitle={habitDate.format("DD/MM")}
          />
          <strong className="text-zinc-400">
            {selectedDayLog?.habits.filter((dlh) => dlh.completed).length ?? 0}/
            {selectedDayLog?.habits.length ?? 0}
          </strong>
        </div>
        {!selectedDayLog || selectedDayLog.habits.length === 0 ? (
          <EmptyHabits past />
        ) : (
          <>
            <div className="w-full h-full flex flex-col gap-1">
              {selectedDayLog &&
                selectedDayLog.habits.map((habit, index) => (
                  <div
                    key={index}
                    className="w-full flex items-center justify-between"
                  >
                    <Checkbox.Root>
                      <Checkbox.Button
                        disabled
                        checked={habit.completed}
                        icon={
                          <CheckIcon className="w-4 h-4 stroke-2 text-white" />
                        }
                      />
                      <Checkbox.Label
                        className="text-zinc-200 font-normal break-words max-w-[50%]"
                        label={habit.habit.title}
                      />
                    </Checkbox.Root>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    );
  }
}
