import { useProfileHabits } from "@/hooks/useProfileHabits";
import ContainerHeader from "../containerHeader";
import HabitsLoader from "@/components/habitsLoader";

export default function StreaksCard() {
  const { streaks, isFetchingStreaks } = useProfileHabits();

  return (
    <div className="w-full 2xl:max-w-lg flex flex-col gap-2 px-2 py-4 border border-zinc-600 rounded-lg">
      <ContainerHeader title="Streaks 🔥" />
      {isFetchingStreaks ? (
        <HabitsLoader />
      ) : (
        <div className="w-full h-full justify-center flex flex-col gap-2">
          {streaks?.map((habit, index) => {
            return (
              <div
                key={index}
                className="w-full flex justify-between text-base"
              >
                <p className="font-light md:text-md max-w-full truncate">
                  {habit.title}
                </p>
                <strong className="text-zinc-400">
                  {habit.completed}/{habit.weekRate}
                </strong>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
