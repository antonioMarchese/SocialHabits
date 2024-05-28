import { useState } from "react";

import { weekDays as weekDaysNames } from "@/utils/choices";
import { Checkbox } from "@/components/checkbox";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function CreateHabitsForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const habitsMutation = api.habits.create.useMutation({
    onSuccess(data, variables, context) {
      console.info("Hábito criado com sucesso!");
      console.info({ data });
    },
    onError(error, variables, context) {
      console.info("Erro ao criar hábito");
      console.error({ error });
    },
  });

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
      habitsMutation.mutate({
        title,
        weekDays,
      });
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
          !title.trim() || weekDays.length === 0 || habitsMutation.isPending
        }
        className="font-semibold bg-violet-600 hover:bg-violet-600/90 active:bg-violet-700"
      >
        Criar
      </Button>
    </form>
  );
}
