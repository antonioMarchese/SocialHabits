"use client";

import { HabitWithRelations, useHabitStore } from "@/store/useHabitStore";
import { api } from "@/trpc/react";
import ProgressBar from "./progressBar";
import ContainerHeader from "../containerHeader";
import { Checkbox } from "@/components/checkbox";
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { weekDays } from "@/utils/choices";
import dayjs from "dayjs";
import { useProfileHabits } from "@/hooks/useProfileHabits";
import { toast } from "sonner";
import { useProfileDayLogs } from "@/hooks/useProfileDayLogs";
import { useDayLogStore } from "@/store/useDayLogStore";
import HabitsLoader from "@/components/habitsLoader";

export default function HabitsCard() {
  const { habitDate, toggleIsModalOpen, setSelectedHabit } = useHabitStore();
  const { selectedDayLog } = useDayLogStore();

  const utils = api.useUtils();

  const { dayHabits: habits, isFetching } = useProfileHabits();

  const habitMutation = api.habits.toggleCompleted.useMutation({
    onError(error, variables, context) {
      toast.error("Erro ao atualizar informação de hábito");
      console.error({ error });
    },
  });

  function handleEditHabit(habit: HabitWithRelations) {
    setSelectedHabit(habit);
    toggleIsModalOpen();
  }

  async function toggleCompleted(habitId: string) {
    if (habits) {
      var newCompletedHabits: string[];
      if (habits.completedHabits.some((id) => habitId === id)) {
        newCompletedHabits = habits.completedHabits.filter(
          (id) => id !== habitId
        );
      } else {
        newCompletedHabits = [...habits.completedHabits, habitId];
      }
      utils.habits.dayHabits.setData(
        {
          day: habitDate.startOf("day").toString(),
        },
        (oldData) => ({
          habits: oldData!.habits,
          completedHabits: [...newCompletedHabits],
        })
      );
    }
    habitMutation.mutate({ habitId });
  }

  if (isFetching)
    return (
      <div className="w-full flex flex-col items-center justify-start flex-1 2xl:max-w-lg gap-8 px-2 py-4 border border-zinc-600 rounded-lg relative">
        <HabitsLoader />
      </div>
    );

  if (!habits) return <></>;

  return (
    <div className="w-full flex flex-col items-center justify-start flex-1 2xl:max-w-lg gap-8 px-2 py-4 border border-zinc-600 rounded-lg relative">
      <ProgressBar
        progress={habits.completedHabits.length / habits.habits.length}
      />
      <div className="w-full flex items-center justify-between">
        <ContainerHeader
          title={weekDays[habitDate.day()]}
          subtitle={habitDate.format("DD/MM")}
        />
        <strong className="text-zinc-400">
          {habitDate.startOf("day").isBefore(dayjs().startOf("day")) &&
          selectedDayLog ? (
            <>
              {selectedDayLog.habits.filter((dlh) => dlh.completed).length}/
              {selectedDayLog.habits.length}
            </>
          ) : (
            <>
              {habits.completedHabits.length}/{habits.habits.length}
            </>
          )}
        </strong>
      </div>
      <div className="w-full flex flex-col gap-1">
        {habitDate.startOf("day").isBefore(dayjs().startOf("day")) ? (
          <>
            {/* Get the info from dayLog */}
            {(selectedDayLog && selectedDayLog.habits.length === 0) ||
              (!selectedDayLog && (
                <div className="w-full flex flex-col flex-1 items-center justify-center px-4 md:px-8">
                  <p className="text-sm md:text-base font-light w-full text-center">
                    Você ainda não possuía nenhum hábito cadastrado.{" "}
                  </p>
                </div>
              ))}
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
          </>
        ) : (
          <>
            {habits.habits.length === 0 && (
              <div className="w-full flex flex-col flex-1 items-center justify-center px-4 md:px-8">
                <p className="text-sm md:text-base font-light w-full text-center">
                  Você ainda não possui nenhum hábito cadastrado.{" "}
                </p>
                <button
                  onClick={toggleIsModalOpen}
                  type="button"
                  className="font-bold text-violet-500"
                >
                  Clique aqui e comece agora!
                </button>
              </div>
            )}
            {habits.habits.map((habit, index) => (
              <div className="w-full flex items-center justify-between">
                <Checkbox.Root key={index}>
                  <Checkbox.Button
                    disabled={
                      !habitDate.startOf("day").isSame(dayjs().startOf("day"))
                    }
                    onClick={() => toggleCompleted(habit.id)}
                    checked={habits.completedHabits.some(
                      (habitId) => habitId === habit.id
                    )}
                    icon={<CheckIcon className="w-4 h-4 stroke-2 text-white" />}
                  />
                  <Checkbox.Label
                    className="text-zinc-200 font-normal break-words max-w-[50%]"
                    label={habit.title}
                  />
                </Checkbox.Root>
                <div className="flex flex-1 w-full items-center justify-end gap-2">
                  <button
                    className="text-zinc-400 hover:text-zinc-300 transition-colors duration-200"
                    type="button"
                    onClick={() => handleEditHabit(habit)}
                  >
                    <PencilSquareIcon className="size-5" />
                  </button>
                  {/* <button
                    className="text-red-500/80 hover:text-red-500/100 transition-all duration-200"
                    type="button"
                  >
                    <TrashIcon className="size-5" />
                  </button> */}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
