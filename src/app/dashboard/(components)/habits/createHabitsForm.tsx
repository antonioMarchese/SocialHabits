import { useState } from "react";

import { weekDays as weekDaysNames } from "@/utils/choices";
import { Checkbox } from "@/components/checkbox";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useHabitStore } from "@/store/useHabitStore";
import { toast } from "sonner";

export default function CreateHabitsForm() {
  const { toggleIsModalOpen, selectedHabit } = useHabitStore();
  const [title, setTitle] = useState(() =>
    selectedHabit ? selectedHabit.title : ""
  );

  const [weekDays, setWeekDays] = useState<number[]>(() =>
    selectedHabit
      ? [...selectedHabit.habit_week_days.map((hwd) => hwd.week_day)]
      : []
  );

  const utils = api.useUtils();

  const createHabitsMutation = api.habits.create.useMutation({
    onSuccess(data, variables, context) {
      toast.success("Hábito criado com sucesso!");
      utils.habits.invalidate();
      resetForm();
      toggleIsModalOpen();
    },
    onError(error, variables, context) {
      console.info("Erro ao criar hábito");
      console.error({ error });
    },
  });

  const updateHabitsMutation = api.habits.update.useMutation({
    onSuccess(data, variables, context) {
      toast.success("Hábito atualizado com sucesso!");
      utils.habits.invalidate();
      resetForm();
      toggleIsModalOpen();
    },
    onError(error, variables, context) {
      alert("Erro ao criar hábito");
      console.error({ error });
    },
  });

  function resetForm() {
    setTitle("");
    setWeekDays([]);
  }

  function selectAllDays() {
    if (weekDays.length < 7) {
      setWeekDays([...weekDaysNames.map((_, i) => i)]);
    } else {
      setWeekDays([]);
    }
  }

  function toggleWeekDay(day: number) {
    setWeekDays((prevState) => {
      if (prevState.some((prevDay) => prevDay === day)) {
        return prevState.filter((prevDay) => prevDay !== day);
      }
      return [...prevState, day];
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (title.trim() && weekDays.length > 0) {
      if (selectedHabit) {
        updateHabitsMutation.mutate({
          title,
          weekDays,
          habitId: selectedHabit.id,
        });
      } else {
        createHabitsMutation.mutate({
          title,
          weekDays,
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
      <input
        placeholder="Academia, ler, etc..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-2 py-3 text-base text-zinc-900 placeholder:text-zinc-700 bg-transparent border border-neutral-700 rounded-md outline-none focus:border-neutral-900"
      />
      <div className="flex flex-col gap-1">
        <Checkbox.Root>
          <Checkbox.Button
            checked={weekDays.length === 7}
            onClick={() => selectAllDays()}
            icon={<CheckIcon className="w-4 h-4 text-white stroke-[3]" />}
          />
          <Checkbox.Label label="Todos os dias" />
        </Checkbox.Root>
        {weekDaysNames.map((weekDayName, weekDayIndex) => (
          <Checkbox.Root key={weekDayIndex}>
            <Checkbox.Button
              checked={weekDays.some((day) => day === weekDayIndex)}
              onClick={() => toggleWeekDay(weekDayIndex)}
              icon={<CheckIcon className="w-4 h-4 text-white stroke-[3]" />}
            />
            <Checkbox.Label label={weekDayName} />
          </Checkbox.Root>
        ))}
      </div>
      <Button
        disabled={
          !title.trim() ||
          weekDays.length === 0 ||
          createHabitsMutation.isPending ||
          updateHabitsMutation.isPending
        }
        isLoading={
          createHabitsMutation.isPending || updateHabitsMutation.isPending
        }
        className="font-semibold bg-violet-600 hover:bg-violet-600/90 active:bg-violet-700"
      >
        {selectedHabit ? "Atualizar" : "Criar"}
      </Button>
    </form>
  );
}
