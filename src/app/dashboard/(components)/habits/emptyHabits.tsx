import { useHabitStore } from "@/store/useHabitStore";

export default function EmptyHabits({ past = false }: { past?: boolean }) {
  const { toggleIsModalOpen } = useHabitStore();

  return (
    <div className="w-full h-full flex flex-col flex-1 items-center justify-center px-4 md:px-8">
      <p className="text-sm md:text-base font-light w-full text-center">
        Você ainda não {past ? "possuía" : "possui"} nenhum hábito cadastrado.{" "}
      </p>
      {!past && (
        <button
          onClick={toggleIsModalOpen}
          type="button"
          className="font-bold text-violet-500"
        >
          Clique aqui e comece agora!
        </button>
      )}
    </div>
  );
}
